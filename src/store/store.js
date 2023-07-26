import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/userDataSlice";

const store = configureStore({
    reducer: {
        userData: userDataReducer,
    }
})

export default store;