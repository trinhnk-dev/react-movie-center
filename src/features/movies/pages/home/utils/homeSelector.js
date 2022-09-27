//Lấy ds phim --by Hung
export const movieListSelector = (state) => state.movieHome.movieList;

export const theater = (state) => state.movieHome.theaterList;

export const theaterGroup = (state) => state.movieHome.theaterGroup;

export const movieTheaterGroup = (state) => state.movieHome.moviesTheater;
