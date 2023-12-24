import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesModal: {
        open: false,
        loading: false,
        message: ""
    },
    watchlistModal: {
        open: false,
        loading: false,
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
        addingToFavorite: (state, action) => {
            state.favoritesModal = { ...state.favoritesModal, loading: true };
            state.favoritesModal = { ...state.favoritesModal, open: true };
            state.favoritesModal = { ...state.favoritesModal, message: action.payload };
        },
        addedToFavorite: (state, action) => {
            state.favoritesModal = { ...state.favoritesModal, loading: false };
            state.favoritesModal = { ...state.favoritesModal, open: true };
            state.favoritesModal = { ...state.favoritesModal, message: action.payload };
        },
        favoriteClose: (state) => {
            state.favoritesModal = { ...state.favoritesModal, open: false };
        },
        addingToWatchlist: (state, action) => {
            state.watchlistModal = { ...state.watchlistModal, loading: true };
            state.watchlistModal = { ...state.watchlistModal, open: true };
            state.watchlistModal = { ...state.watchlistModal, message: action.payload };
        },
        addedToWatchlist: (state, action) => {
            state.watchlistModal = { ...state.watchlistModal, loading: false };
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

export const { addedToFavorite, favoriteClose, addingToFavorite, addedToWatchlist, watchListClose, addingToWatchlist, auth, authClose } = modalsSlice.actions;

export default modalsSlice.reducer;