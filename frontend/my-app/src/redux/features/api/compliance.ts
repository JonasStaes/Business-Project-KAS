import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { CreditRequestComplianceFeedbackDto, CreditRequestReadDto, MessageResponse } from "./types"

const urlBase: string = "compliance"

const complianceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSuspiciousRequests: builder.query<Array<CreditRequestReadDto>, undefined>({
            query: () => `${urlBase}/all`,
            transformResponse: (res: MessageResponse<Array<CreditRequestReadDto>>) => res.data
        }),
        setFeedBackCompliance: builder.mutation<CreditRequestReadDto, { creditRequestComplianceFeedbackDto: CreditRequestComplianceFeedbackDto, callback: Function }>({
            query: ({
                creditRequestComplianceFeedbackDto: {
                    id,
                    feedbackNote: { value: feedbackNote },
                }
            }) => {
                let formData = new FormData();
                formData.append("id", id);
                formData.append("feedbackNote", feedbackNote);
                return {
                    url: `${urlBase}/add_feedback`,
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
                    dispatch(activateError({message: "Probleem bij het aanpassen van de feedback"}))
                }
            },
            invalidatesTags: (result) => result ? [{type: "CreditRequests", id: result.id}] 
            : ["CreditRequests"]
        }),
        getOneCreditRequestCompliance: builder.query<CreditRequestReadDto, string>({
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

    }),
    
    overrideExisting: true
})

export const { useGetAllSuspiciousRequestsQuery, useSetFeedBackComplianceMutation, useGetOneCreditRequestComplianceQuery } = complianceApi

