import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"
import { GlobalState } from "../../store"

export type AuthState = {
    accessToken: string | null,
    id: string | null,
    roles: Array<string> | null
}

const authSlice = createSlice({
    name: "auth",
    initialState: { accessToken: null, id: null, roles: null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { accessToken, id, roles } }: PayloadAction<{ accessToken: string, id: string, roles: Array<string>}>
        ) => {
            state.accessToken = accessToken
            state.id = id
            state.roles = roles
        },
        logout: (state) => {
            state.accessToken = null
            state.id = null
            state.roles = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            state.accessToken = null
            state.id = null
            state.roles = null
        })
    }
})

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
export const selectCurrentUserId = (state: GlobalState) => state.auth.id === null ? "" : state.auth.id;
export const selectCurrentToken = (state: GlobalState) => state.auth.accessToken;
export const selectCurrentRoles = (state: GlobalState) => state.auth.roles;

export const selectIsCustomer = createSelector(
    selectCurrentRoles,
    (roles) => {
        if(roles !== null) {
            return roles.includes("KLANT") 
        }

        return false;
    }
);

export const selectIsAdmin = createSelector(
    selectCurrentRoles,
    (roles) => roles?.includes("ADMINISTRATOR")
);

export const selectIsRatingAgent = createSelector(
    selectCurrentRoles,
    (roles) => roles?.includes("KREDIET_BEOORDELAAR")
);

export const selectIsCompliance = createSelector(
    selectCurrentRoles,
    (roles) => roles?.includes("COMPLIANCE")
);

export const selectIsCommercialDirection = createSelector(
    selectCurrentRoles,
    (roles) => roles?.includes("COMMERCIELE_DIRECTIE")
);

export const selectIsOfficeWorker = createSelector(
    selectCurrentRoles,
    (roles) => roles?.includes("KANTOOR_MEDEWERKER")
);
