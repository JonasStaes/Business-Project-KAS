import { activateError } from "../errors/errorSlice";
import { baseApi } from "./baseApi";
import { CustomerCreateDto, EmployeeCreateDto, MessageResponse, UserReadDto } from "./types"

const urlBase: string = "admin"

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<Array<UserReadDto>, void>({
            query: () => `${urlBase}/allUsers`,
            transformResponse: (response: MessageResponse<Array<UserReadDto>>) => response.data,
            providesTags: [{ type: "Users", id: "LIST" }]
        }),
        getCustomerRoles: builder.query<Array<string>, void>({
            query: () => `${urlBase}/customerRoles`,
            transformResponse: (response: MessageResponse<Array<string>>) => response.data,
        }),
        getEmployeeRoles: builder.query<Array<string>, void>({
            query: () => `${urlBase}/employeeRoles`,
            transformResponse: (response: MessageResponse<Array<string>>) => response.data,
        }),
        createCustomer: builder.mutation<UserReadDto, { customerCreateDto: CustomerCreateDto, callback: Function }>({
            query: ({
                customerCreateDto: {
                    name: { value: name },
                    email: { value: email },
                    companyNr: { value: companyNr },
                    role: { value: role }
                }
            }) => { 
                console.log(role)
                let formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('companyNr', companyNr)
                formData.append('role', role)
                return {
                    url: `${urlBase}/newCustomer`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<UserReadDto>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanmaken van de klant"}))
                }
            },
            invalidatesTags: [{ type: "Users", id: "LIST" }]
        }),
        createEmployee: builder.mutation<UserReadDto, { employeeCreateDto: EmployeeCreateDto, callback: Function }>({
            query: ({
                employeeCreateDto: {
                    name: { value: name },
                    email: { value: email },
                    roles: { value: roles }
                }
            }) => {
                let formData = new FormData();
                formData.append('name', name);
                formData.append('email', email); 
                roles.forEach(role => {
                    formData.append('roles', role);
                })   
                return {
                    url: `${urlBase}/newEmployee`,
                    method: "POST",
                    body: formData
                }
            },
            transformResponse: (response: MessageResponse<UserReadDto>) => response.data,
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                    request.callback();
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het aanmaken van de klant"}))
                }
            },
            invalidatesTags: [{ type: "Users", id: "LIST" }]
        }),
        deactivateUser: builder.mutation<MessageResponse<null>, string>({
            query: (id) => {
                return {
                    url: `${urlBase}/users/${id}`,
                    method: "PUT"
                }
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(activateError({message: "Probleem bij het deactiveren van deze gebruiker"}))
                }
            },
            invalidatesTags: [{ type: "Users", id: "LIST" }]
        })
    }),
})

export const { 
    useGetAllUsersQuery, 
    useGetCustomerRolesQuery, 
    useGetEmployeeRolesQuery,
    useCreateCustomerMutation,
    useCreateEmployeeMutation,
    useDeactivateUserMutation
} = adminApi;