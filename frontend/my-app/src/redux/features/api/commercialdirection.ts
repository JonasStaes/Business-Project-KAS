import { baseApi } from "./baseApi"
import { ListEntryDto, MessageResponse } from "./types"

const urlBase: string = "commercial_direction"

const complianceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWhiteListEntries: builder.query<Array<ListEntryDto>, undefined>({
            query: () => `${urlBase}/allwhitelist`,
            transformResponse: (res: MessageResponse<Array<ListEntryDto>>) => res.data
        }),
        getAllBlackListEntries: builder.query<Array<ListEntryDto>, undefined>({
            query: () => `${urlBase}/allblacklist`,
            transformResponse: (res: MessageResponse<Array<ListEntryDto>>) => res.data
        })
    })
})

export const { useGetAllWhiteListEntriesQuery } = complianceApi