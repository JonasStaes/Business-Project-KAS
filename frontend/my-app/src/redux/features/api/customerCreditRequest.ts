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
        createCreditRequest: builder.mutation<CreditRequestReadDto, { creditRequestCreateDto: CreditRequestCreateDto, callback: Function }>({
            query: ({ 
                creditRequestCreateDto: {
                    name: { value: name }, 
                    financedAmount: { value: financedAmount }, 
                    totalAmount: { value: totalAmount }, 
                    duration: { value: duration }, 
                    investmentType: { value: { name: investmentType} }, 
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
                formData.append("investmentType", investmentType);
                if(files.length > 0) {
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
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanmaken van kredietaanvraag"}))
                }
            },

        })
    }),
})

export const { useGetCustomerCreditRequestsQuery, useCreateCreditRequestMutation } = customerApi;