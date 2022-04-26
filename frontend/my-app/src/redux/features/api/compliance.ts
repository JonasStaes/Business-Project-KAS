import { baseApi } from "./baseApi"
import { CreditRequestReadDto, MessageResponse } from "./types"

const urlBase: string = "compliance"

const complianceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSuspiciousRequests: builder.query<Array<CreditRequestReadDto>, undefined>({
            query: () => `${urlBase}/all`,
            transformResponse: (res: MessageResponse<Array<CreditRequestReadDto>>) => res.data
        })
    })
})

export const { useGetAllSuspiciousRequestsQuery } = complianceApi

