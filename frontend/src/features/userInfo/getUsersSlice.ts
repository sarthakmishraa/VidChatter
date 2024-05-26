import { createSlice } from "@reduxjs/toolkit";

export const getUsersSlice = createSlice({
    name: "getUsers",
    initialState: {
        value: {
            users: {
                id: "",
                firstname: "",
                lastname: "",
                password: ""
            }
        },
    },
    reducers: {
        getAllUsersData: (state, action) => {
            const payload = action.payload;
            state.value.users = payload;
        }
    }
});

export const { getAllUsersData } = getUsersSlice.actions;
export default getUsersSlice.reducer;