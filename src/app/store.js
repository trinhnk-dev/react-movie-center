import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "features/movies/pages/booking_seats/utils/bookingSlice";
import detailSlice from "features/movies/pages/detail/utils/detailSlice";
import bannerSlice from "features/movies/pages/home/components/Banner/utils/bannerSlice";
import homeSlice from "features/movies/pages/home/utils/homeSlice";
import authSlice from "features/authentication/utils/authSlice";

const store = configureStore({
  reducer: {
    movieHome: homeSlice.reducer,

    bannerHome: bannerSlice.reducer,

    movieDetail: detailSlice.reducer,
    movieBooking: bookingSlice.reducer,

    auth: authSlice.reducer,
  },
});
export default store;
