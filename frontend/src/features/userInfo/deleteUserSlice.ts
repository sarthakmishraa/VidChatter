import { createSlice } from "@reduxjs/toolkit";

export const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState: {
        value: {
            user: {
                firstname: "",
                lastname: "",
                password: ""
            }
        }
    },
    reducers: {
        deleteSingleUser: (state, action) => {
            state.value.user = action.payload;
        }
    },
});

export const { deleteSingleUser } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;