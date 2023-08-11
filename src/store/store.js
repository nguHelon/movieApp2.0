import { configureStore } from "@reduxjs/toolkit";
import { tmdbAPI } from "./services/tmdbAPI";

const store = configureStore({
    reducer: {
        [tmdbAPI.reducerPath]: tmdbAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPI.middleware)
})

export default store;