import { setCredentials } from "../auth/authSlice";
import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { CustomerLoginRequest, EmployeeLoginRequest, LoginResponse, MessageResponse } from "./types"

const urlBase: string = "signin"

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginCustomer: builder.mutation<LoginResponse, CustomerLoginRequest>({
            query: ({ 
                companyNr: { value: companyNr }, 
                password: { value: password} 
            }) => {
                let formData = new FormData();
                formData.append('companyNr', companyNr.toString())
                formData.append('password', password)
                return {
                    url: `${urlBase}/customer`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<LoginResponse>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials(data))
                } catch (error) {
                    dispatch(activateError({message: "Wachtoord of ondernemingsnummer is onjuist"}))
                }
            }
        }),
        loginEmployee: builder.mutation<LoginResponse, EmployeeLoginRequest>({
            query: ({ 
                email: { value: email }, 
                password: { value: password } 
            }) => {
                let formData = new FormData();
                formData.append('email', email)
                formData.append('password', password)
                return {
                    url: `${urlBase}/employee`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<LoginResponse>) => response.data,
            onQueryStarted: (request, {dispatch, queryFulfilled}) => {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(setCredentials(data))
                    })
                    .catch((error) => {
                        console.error(error)
                        dispatch(activateError({message: "Wachtwoord of email is onjuist"}))
                    })
            }
        })
    }),
    overrideExisting: true
})

export const { useLoginCustomerMutation, useLoginEmployeeMutation } = authApi