import { baseApi } from "./baseApi"
import { InvestmentType, MessageResponse } from "./types";

const urlBase: string = "enums"

const enumsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllInvestmentTypes: builder.query<Array<InvestmentType>, void>({
            query: () => `${urlBase}/investmentTypes`,
            transformResponse: (response: MessageResponse<Array<InvestmentType>>) => response.data,
        }),
        getAllStatuses: builder.query<Array<string>, void>({
            query: () => `${urlBase}/statuses`,
            transformResponse: (response: MessageResponse<Array<string>>) => response.data,
        })
    }),
    overrideExisting: false
});

export const { useGetAllInvestmentTypesQuery, useGetAllStatusesQuery } = enumsApi;