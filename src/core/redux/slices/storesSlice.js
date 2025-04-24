/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllStores } from '../services/operations/storesApi';

const initialState = {
	loading: false,
	stores: [],
	store: null,
};

const storesSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setStores: (state, action) => {
			state.stores = action.payload;
		},
		setStore: (state, action) => {
			state.store = action.payload;
		},
	},
});

export function refreshStores() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getAllStores();
			console.log('refresh all stores response ---', response);
			if (response.status === 'success') {
				const array = Object.keys(response)
					.filter((key) => key !== 'status')
					.map((key) => response[key]);
				dispatch(setStores(array));
			}
		} catch (error) {
			console.error('Error refreshing stores:', error);
		}
	};
}

export const { setLoading, setStores, setStore } = storesSlice.actions;
export default storesSlice.reducer;
