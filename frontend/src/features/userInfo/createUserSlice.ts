import { createSlice } from "@reduxjs/toolkit";

export const createUserSlice = createSlice({
    name: "createUser",
    initialState: {
        value: {
            firstname: "",
            lastname: "",
            password: "",
        },
    },
    reducers: {
        addFirstname: (state, action) => {
            state.value.firstname = action.payload;
        },
        addLastname: (state, action) => {
            state.value.lastname = action.payload;
        },
        addPassword: (state, action) => {
            state.value.password = action.payload;
        },
    },
});

export const { addFirstname, addLastname, addPassword } = createUserSlice.actions;

export default createUserSlice.reducer;