import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: {
        value: {
            firstname: "",
            lastname: "",
            password: "",
        },
    },
    reducers: {
        updateFirstname: (state, action) => {
            state.value.firstname = action.payload;
        },
        updateLastname: (state, action) => {
            state.value.lastname = action.payload;
        },
        updatePassword: (state, action) => {
            state.value.password = action.payload;
        },
    },
});

export const { updateFirstname, updateLastname, updatePassword } = updateUserSlice.actions;

export default updateUserSlice.reducer;