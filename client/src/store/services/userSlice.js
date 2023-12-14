import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logInStart: (state) => {
            state.loading = true;
        },
        logInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        logInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logOutStart: (state) => {
            state.loading = true;
        },
        logOutSuccessfull: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    signUpStart,
    signUpSuccess,
    signUpFailure,
    logInStart,
    logInSuccess,
    logInFailure,
    updateStart,
    updateSuccess,
    updateFailed,
    logOutStart,
    logOutSuccessfull,
    logOutFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess
} = userSlice.actions;

export default userSlice.reducer;