import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tmdbAPI } from "./services/tmdbAPI";
import userReducer from "./services/userSlice";
import modalsReducer from "./services/modalsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userReducer,
    modals: modalsReducer,
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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(tmdbAPI.middleware)
})

export const persistor = persistStore(store);