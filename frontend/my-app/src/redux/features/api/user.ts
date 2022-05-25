import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { CustomerFinalizationDto, EmployeeFinalizationDto, MessageResponse } from "./types"

const urlBase: string = "user"

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        requestCustomerFinalization: builder.query<MessageResponse<null>, string>({
            query: (id) => {
                return  {
                    url: `${urlBase}/requestCustomer/${id}`,
                    method: "POST"
                }
            },
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: `Kon de nieuwe klant niet vinden`}))
                }
            },
        }),
        finalizeCustomer: builder.mutation<MessageResponse<null>, { customerFinalizationDto: CustomerFinalizationDto, callback: Function }>({
            query: ({ 
                customerFinalizationDto: {
                    token, 
                    password: { value: password }, 
                    township: { value: township }, 
                    homeNumber: { value: homeNumber }, 
                    streetName: { value: streetName }, 
                    postalCode: { value: postalCode }, 
                    birthplace: { value: birthplace }, 
                    birthDate: { value: birthDate }, 
                    phoneNr: { value: phoneNr }, 
                    socialRegistryNr: { value: socialRegistryNr } 
                }
            }) => {
                let formData = new FormData();
                formData.append("token", token)
                formData.append("password", password);
                formData.append("township", township);
                formData.append("homeNumber", homeNumber.toString());
                formData.append("streetName", streetName);
                formData.append("postalCode", postalCode.toString());
                formData.append("birthPlace", birthplace);
                formData.append("birthDate", birthDate.toString());
                formData.append("phoneNr", phoneNr.toString());
                formData.append("socialRegistryNr", socialRegistryNr.toString());
                return {
                    url: `${urlBase}/finalizeCustomer`,
                    method: "PUT",
                    body: formData
                }
            },
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    body.callback();
                } catch (error) {
                    dispatch(activateError({message: `Kon uw informatie niet afmaken, contacteer FBA voor hulp`}))
                    body.callback();
                }
            },
        }),
        requestEmployeeFinalization: builder.query<MessageResponse<null>, string>({
            query: (id) => {
                return  {
                    url: `${urlBase}/requestEmployee/${id}`,
                    method: "POST"
                }
            },
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: `Kon deze werknemer niet vinden`}))
                }
            },
        }),
        finalizeEmployee: builder.mutation<MessageResponse<null>, { employeeFinalizationDto: EmployeeFinalizationDto, callback: Function }>({
            query: ({
                employeeFinalizationDto: {
                    token,
                    password: { value: password }
                }
            }) => {
                let formData = new FormData();
                formData.append("token", token)
                formData.append("password", password);
                return {
                    url: `${urlBase}/finalizeEmployee`,
                    method: "PUT",
                    body: formData
                }
            },
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    body.callback();
                } catch (error) {
                    dispatch(activateError({message: `Kon uw informatie niet afmaken, contacteer een admin voor hulp`}))
                    body.callback();
                }
            },
        })
    }),
    overrideExisting: true
})

export const { 
    useRequestCustomerFinalizationQuery, 
    useFinalizeCustomerMutation,
    useRequestEmployeeFinalizationQuery,
    useFinalizeEmployeeMutation
} = userApi;