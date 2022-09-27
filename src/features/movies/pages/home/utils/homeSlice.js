import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMovieListAction,
  fetchMoviesTheater,
  fetchTheater,
  fetchTheaterGroupAction,
} from "./homeAction";
const homeSlice = createSlice({
  name: "home",
  initialState: {
    movieList: null,
    theaterList: null,
    moviesTheater: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieListAction.fulfilled, (state, action) => {
      state.movieList = action.payload;
    });

    builder.addCase(fetchTheater.fulfilled, (state, action) => {
      state.theaterList = action.payload;
    });

    builder.addCase(fetchMoviesTheater.fulfilled, (state, action) => {
      state.moviesTheater = action.payload;
    });
  },
});
export default homeSlice;
