import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favorites: [],
    watchlist: [],
}

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {

    }
})

export default userDataSlice.reducer;