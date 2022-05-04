import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { ListEntryDto, ListEntryReadDto, MessageResponse } from "./types"

const urlBase: string = "commercial_direction"

const complianceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWhiteListEntries: builder.query<Array<ListEntryReadDto>, undefined>({
            query: () => `${urlBase}/allwhitelist`,
            transformResponse: (res: MessageResponse<Array<ListEntryReadDto>>) => res.data
        }),
        getAllBlackListEntries: builder.query<Array<ListEntryReadDto>, undefined>({
            query: () => `${urlBase}/allblacklist`,
            transformResponse: (res: MessageResponse<Array<ListEntryReadDto>>) => res.data
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

        createBlackListEntry: builder.mutation<ListEntryDto, { listEntryDto: ListEntryDto, callback: Function }>({
            query: ({ 
                listEntryDto: {
                    nacebel: { value: nacebel }, 
                }
            }) => {
                let formData = new FormData();
                formData.append('nacebel', nacebel);
                return {
                    url: `${urlBase}/blacklist`,
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
                    dispatch(activateError({message: "Probleem bij het aanmaken van black list entry"}))
                }
            },
            invalidatesTags: ["WhiteListEntry"]
        }),
        deleteWhiteListEntry: builder.mutation<MessageResponse<null>, string>({
            query: (id) => {
                return {
                    url: `${urlBase}/whitelistdelete/${id}`,
                    method: "DELETE"
                }
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het verwijderen van deze  entry"}))
                }
            },
            invalidatesTags: [{ type: "WhiteListEntry", id: "LIST" }]
        }),

        deleteBlackListEntry: builder.mutation<MessageResponse<null>, string>({
            query: (id) => {
                return {
                    url: `${urlBase}/blacklistdelete/${id}`,
                    method: "DELETE"
                }
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het verwijderen van deze entry"}))
                }
            },
            invalidatesTags: [{ type: "WhiteListEntry", id: "LIST" }]
        })
    })
})

export const { useGetAllWhiteListEntriesQuery, useGetAllBlackListEntriesQuery, useCreateWhiteListEntryMutation, useCreateBlackListEntryMutation, useDeleteWhiteListEntryMutation, useDeleteBlackListEntryMutation} = complianceApi