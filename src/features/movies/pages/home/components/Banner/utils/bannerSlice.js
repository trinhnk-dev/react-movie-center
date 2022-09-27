const { createSlice } = require("@reduxjs/toolkit");
const { fetchBannerAction } = require("./bannerAction");

const initialState = {
	banners: null,
};

const bannerSlice = createSlice({
	name: "banner",
	initialState: initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(fetchBannerAction.fulfilled, (state, action) => {
			state.banners = action.payload;
		});
	},
});

export default bannerSlice;
