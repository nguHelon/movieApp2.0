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
            state.favoritesModal.message = action.payload;
        },
        favoriteClose: (state) => {
            state.favoritesModal.open = false;
        },
        addedToWatchlist: (state, action) => {
            state.watchlistModal.open = true;
            state.watchlistModal.message = action.payload;
        },
        watchListClose: (state) => {
            state.watchlistModal.open = false;
        },
        auth: (state, action) => {
            state.authModal.open = true;
            state.authModal.message == action.payload;
        },
        authClose: (state) => {
            state.authModal.open = false;
        }
    }
});

export const { addedToFavorite, favoriteClose, addedToWatchlist, watchListClose, auth, authClose } = modalsSlice.actions;

export default modalsSlice.reducer;