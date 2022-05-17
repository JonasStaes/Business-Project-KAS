import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi"
import { MessageResponse, PasswordChangeDto, PasswordChangeRequestDto } from "./types"


const urlBase: string = "change_password"

const passwordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        requestPasswordChange: builder.mutation<MessageResponse<void>, { passwordChangeRequestDto: PasswordChangeRequestDto, callback: Function }>({
            query: ({
                passwordChangeRequestDto: {
                    name: { value: name },
                    email: { value: email }
                }
            }) => {
                let formData = new FormData();
                formData.append('name', name);
                formData.append('email', email); 
                return {
                    url: `${urlBase}/request`,
                    method: "POST",
                    body: formData
                }
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanvragen van een wachtwoord update"}))
                }
            },
        }),
        changePassword: builder.mutation<MessageResponse<void>, { passwordChangeDto: PasswordChangeDto, callback: Function }>({
            query: ({
                passwordChangeDto: {
                    token,
                    password: { value: password }
                }
            }) => {
                let formData = new FormData();
                formData.append('token', token);
                formData.append('password', password); 
                return {
                    url: `${urlBase}/`,
                    method: "PUT",
                    body: formData
                }
            }
        })
    }),
    overrideExisting: true
})

export const { useRequestPasswordChangeMutation, useChangePasswordMutation } = passwordApi;
