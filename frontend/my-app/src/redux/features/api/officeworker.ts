import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi";
import { CreditRequestReadDto, CreditRequestStatusConfirmationDto, MessageResponse } from "./types";

const urlBase: string = "office_worker";

const officeWorkerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCreditRequestsOffice: builder.query<Array<CreditRequestReadDto>, void>({
            query: () => `${urlBase}/all`,
            transformResponse: (response: MessageResponse<Array<CreditRequestReadDto>>) => response.data,
            providesTags: (result) => result ? [...result.map(({id}) => ({
                type: "CreditRequests" as const, id
            }))] 
            : ["CreditRequests"]
        }),
        getOneCreditRequestOffice: builder.query<CreditRequestReadDto, string>({
            query: (id) => `${urlBase}/${id}`,
            transformResponse: (response: MessageResponse<CreditRequestReadDto>) => response.data,
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: `Kon kredietaanvraag met id: ${body} niet vinden`}))
                }
            },
        }),
        setApprovalStatusOffice: builder.mutation<CreditRequestReadDto, { creditRequestStatusConfirmationDto: CreditRequestStatusConfirmationDto, approval: boolean, callback: Function }>({
            query: ({
                creditRequestStatusConfirmationDto: {
                    id,
                    approvalNote: { value: approvalNote },
                },
                approval
            }) => {
                let formData = new FormData();
                formData.append("id", id);
                formData.append("approval", approval.toString());
                formData.append("approvalNote", approvalNote);
                return {
                    url: `${urlBase}/confirm_status`,
                    method: "PUT",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<CreditRequestReadDto>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanpassen van de status"}))
                }
            },
            invalidatesTags: (result) => result ? [{type: "CreditRequests", id: result.id}] 
            : ["CreditRequests"]
        }),
        deleteCreditRequestOffice: builder.mutation<MessageResponse<null>, string>({
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
                    dispatch(activateError({message: "Probleem bij het verwijderen van deze gebruiker"}))
                }
            },
            invalidatesTags: [{ type: "Users", id: "LIST" }]
        })
    })
})

export const { useGetAllCreditRequestsOfficeQuery, useGetOneCreditRequestOfficeQuery, useSetApprovalStatusOfficeMutation, useDeleteCreditRequestOfficeMutation } = officeWorkerApi