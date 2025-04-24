/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllSellers } from '../services/operations/sellerApi';

const initialState = {
	loading: false,
	sellers: [],
	seller: null,
};

const sellersSlice = createSlice({
	name: 'seller',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setSellers: (state, action) => {
			state.sellers = action.payload;
		},
		setSeller: (state, action) => {
			state.seller = action.payload;
		},
	},
});

export function refreshSellers() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getAllSellers();
			console.log('refresh all sellers response ---', response);
			if (response.status === 'success') {
				const array = Object.keys(response)
					.filter((key) => key !== 'status')
					.map((key) => response[key]);
				dispatch(setSellers(array));
			}
		} catch (error) {
			console.error('Error refreshing sellers:', error);
		}
	};
}

export const { setLoading, setSellers, setSeller } = sellersSlice.actions;
export default sellersSlice.reducer;
