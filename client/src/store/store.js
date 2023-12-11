import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tmdbAPI } from "./services/tmdbAPI";
import userReducer from "./services/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userReducer,
    [tmdbAPI.reducerPath]: tmdbAPI.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPI.middleware)
})

export const persistor = persistStore(store);