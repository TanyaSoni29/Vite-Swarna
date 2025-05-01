/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllCoupons } from '../services/operations/couponsApi';

const initialState = {
	loading: false,
	coupons: [],
	coupon: null,
};

const couponSlice = createSlice({
	name: 'coupon',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setCoupons: (state, action) => {
			state.coupons = action.payload;
		},
		setCoupon: (state, action) => {
			state.coupon = action.payload;
		},
	},
});

export function refreshCoupons() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getAllCoupons();
			console.log('refresh all coupons response ---', response);
			if (response.status === 'success') {
				const array = Object.keys(response)
					.filter((key) => key !== 'status')
					.map((key) => response[key]);
				dispatch(setCoupons(array));
			}
		} catch (error) {
			console.error('Error refreshing coupons:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const { setLoading, setCoupons, setCoupon } = couponSlice.actions;
export default couponSlice.reducer;
