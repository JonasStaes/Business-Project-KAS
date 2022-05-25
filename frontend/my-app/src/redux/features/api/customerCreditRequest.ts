import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { CreditRequestCreateDto, CreditRequestReadDto, MessageResponse } from "./types"

const urlBase: string = "credit_request"

const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomerCreditRequests: builder.query<Array<CreditRequestReadDto>, string>({
            query: (id) => `${urlBase}/all/${id}`,
            transformResponse: (response: MessageResponse<Array<CreditRequestReadDto>>) => response.data,
            providesTags: (result) => result ? [...result.map(({id}) => ({
                type: "CreditRequests" as const, id
            }))] 
            : ["CreditRequests"]
        }),
        getOneCustomerCreditRequest: builder.query<CreditRequestReadDto, string>({
            query: (id) => `${urlBase}/${id}`,
            transformResponse: (response: MessageResponse<CreditRequestReadDto>) => response.data,
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled
                    if(data.files !== undefined) {
                        console.log(data.files[0].data.toString())
                        console.log("file")
                        console.log(new File([Buffer.from(data.files[0].data.toString(), "base64")], data.files[0].name, { type: data.files[0].type}))
                    }
                } catch (error) {
                    //dispatch(activateError({message: `Kon kredietaanvraag met id: ${body} niet vinden`}))
                }
            },
        }),
        createCreditRequest: builder.mutation<CreditRequestReadDto, { creditRequestCreateDto: CreditRequestCreateDto, callback: Function }>({
            query: ({ 
                creditRequestCreateDto: {
                    name: { value: name }, 
                    financedAmount: { value: financedAmount }, 
                    totalAmount: { value: totalAmount }, 
                    duration, 
                    investmentType: { name: investmentType }, 
                    approvalNote: { value: approvalNote },
                    files,
                    currentUser
                }
            }) => {
                let formData = new FormData();
                formData.append('name', name);
                formData.append('financedAmount', financedAmount.toString());
                formData.append('totalAmount', totalAmount.toString());
                formData.append('duration', `P${duration}Y`);
                formData.append('parentId', currentUser);
                formData.append('investmentType', investmentType);
                formData.append('approvalNote', approvalNote);
                if(files.length !== undefined) {
                    files.forEach(file => {
                        formData.append('files', file);
                    })   
                }   
                return {
                    url: `${urlBase}/`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<CreditRequestReadDto>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    const { data } = await queryFulfilled
                    request.callback(data.id);
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanmaken van kredietaanvraag"}))
                }
            },
            invalidatesTags: ["CreditRequests"]
        }),
        validateCreditRequest: builder.mutation<CreditRequestReadDto, string>({
            query: (id) => {
                return {
                    url: `${urlBase}/${id}`,
                    method: "PUT"
                }
            },
            transformResponse: (response: MessageResponse<CreditRequestReadDto>) => response.data,
            invalidatesTags: (res) => [{ type: "CreditRequests", id: res?.id }]
        }),
        deleteCreditRequestCustomer: builder.mutation<MessageResponse<null>, string>({
            query: (id) => {
                return {
                    url: `${urlBase}/editCreditRequest/${id}`,
                    method: "DELETE"
                }
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het intrekken van deze kredietaanvraag"}))
                }
            },
            invalidatesTags: [{ type: "Users", id: "LIST" }]
        }),
    }),
    overrideExisting: true
})

export const { useGetCustomerCreditRequestsQuery, useCreateCreditRequestMutation, useValidateCreditRequestMutation, useGetOneCustomerCreditRequestQuery, useDeleteCreditRequestCustomerMutation } = customerApi;