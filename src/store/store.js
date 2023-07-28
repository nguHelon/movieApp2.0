import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/userDataSlice";
import { tmdbAPI } from "./services/tmdbAPI";

const store = configureStore({
    reducer: {
        userData: userDataReducer,
        [tmdbAPI.reducerPath]: tmdbAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPI.middleware)
})

export default store;