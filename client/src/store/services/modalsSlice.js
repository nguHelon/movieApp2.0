import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesModal: {
        open: false,
        message: ""
    },
    watchlistModal: {
        open: false,
        message: ""
    },
    authModal: {
        open: false,
        message: ""
    }
}

const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        addedToFavorite: (state, action) => {
            state.favoritesModal = { ...state.favoritesModal, open: true };
            state.favoritesModal = { ...state.favoritesModal, message: action.payload };
        },
        favoriteClose: (state) => {
            state.favoritesModal = { ...state.favoritesModal, open: false };
        },
        addedToWatchlist: (state, action) => {
            state.watchlistModal = { ...state.watchlistModal, open: true };
            state.watchlistModal = { ...state.watchlistModal, message: action.payload };
        },
        watchListClose: (state) => {
            state.watchlistModal = { ...state.watchlistModal, open: false };
        },
        auth: (state, action) => {
            state.authModal = { ...state.authModal, open: true };
            state.authModal = { ...state.authModal, message: action.payload };
        },
        authClose: (state) => {
            state.authModal = { ...state.authModal, open: false };
        }
    }
});

export const { addedToFavorite, favoriteClose, addedToWatchlist, watchListClose, auth, authClose } = modalsSlice.actions;

export default modalsSlice.reducer;