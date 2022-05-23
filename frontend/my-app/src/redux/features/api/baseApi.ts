import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GlobalState } from '../../store'

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["CreditRequests", "Users", "WhiteListEntry"],
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://projectbus4.p.bletchley.cloud:8069/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as GlobalState).auth.accessToken
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    keepUnusedDataFor: 86400000,
    endpoints: () => ({}),
})