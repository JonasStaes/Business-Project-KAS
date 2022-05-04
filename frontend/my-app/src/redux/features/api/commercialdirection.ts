import { activateError } from "../errors/errorSlice";
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
        }),
        createWhiteListEntry: builder.mutation<ListEntryDto, { listEntryDto: ListEntryDto, callback: Function }>({
            query: ({ 
                listEntryDto: {
                    nacebel: { value: nacebel }, 
                }
            }) => {
                let formData = new FormData();
                formData.append('nacebel', nacebel);
                return {
                    url: `${urlBase}/whitelist`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<ListEntryDto>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanmaken van whitelistentry"}))
                }
            },
            invalidatesTags: ["WhiteListEntry"]
        }),
    })
})

export const { useGetAllWhiteListEntriesQuery, useGetAllBlackListEntriesQuery, useCreateWhiteListEntryMutation } = complianceApi