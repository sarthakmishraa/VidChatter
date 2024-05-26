import { createSlice } from "@reduxjs/toolkit";

export const getUserSlice = createSlice({
    name: "getUser",
    initialState: {
        value: {
            user: {
                firstname: "",
                lastname: "",
                password: ""
            }
        },
    },
    reducers: {
        getSingleUser: (state, action) => {
            state.value.user = action.payload;
        }
    }
});

export const { getSingleUser } = getUserSlice.actions;
export default getUserSlice.reducer;