import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorState = {
    message: string,
    active: boolean
}

export const errorSlice = createSlice({
    name: 'error',
    initialState: { message: "", active: false } as ErrorState,
    reducers: {
        activateError: (
            state,
            { payload: { message } }: PayloadAction<{ message: string }>
        ) => {
            state.message = message
            state.active = true
        },
        deactivateError: (
            state,
        ) => {
            state.message = ""
            state.active = false
        }
    }
});

export default errorSlice.reducer;
export const { activateError, deactivateError } = errorSlice.actions;