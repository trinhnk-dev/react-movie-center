import { createSlice } from "@reduxjs/toolkit";
import {
	fetchTheaterAction,
	fetchSelectedMovieAction,
	fetchScheduleAction,
	fetchMovieListColumnAction,
} from "./detailAction";

const initialState = {
	movieInfo: null,
	theater: null,
	schedule: null,
	movieListColumn: null,
};

const detailSlice = createSlice({
	name: "detail",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		// info
		builder.addCase(fetchSelectedMovieAction.fulfilled, (state, action) => {
			state.movieInfo = action.payload;
		});

		// theater
		builder.addCase(fetchTheaterAction.fulfilled, (state, action) => {
			state.theater = action.payload;
		});

		// schedule
		builder.addCase(fetchScheduleAction.fulfilled, (state, action) => {
			state.schedule = action.payload;
		});

		// movie list (for MovieListColumn)
		builder.addCase(
			fetchMovieListColumnAction.fulfilled,
			(state, action) => {
				state.movieListColumn = action.payload;
			}
		);
	},
});
export default detailSlice;
