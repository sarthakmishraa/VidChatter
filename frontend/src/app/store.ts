import { configureStore } from "@reduxjs/toolkit";
import { createUserSlice } from "../features/userInfo/createUserSlice";
import { updateUserSlice } from "../features/userInfo/updateUserSlice";
import { getUsersSlice } from "../features/userInfo/getUsersSlice";
import { getUserSlice } from "../features/userInfo/getUserSlice";

const { reducer: createUserReducer } = createUserSlice;
const { reducer: updateUserReducer } = updateUserSlice;
const { reducer: getUsersReducer } = getUsersSlice;
const { reducer: getUserReducer } = getUserSlice;

export const store = configureStore({
    reducer: {
        createUser: createUserReducer,
        updateUser: updateUserReducer,
        getUsers: getUsersReducer,
        getUser: getUserReducer
    },
});