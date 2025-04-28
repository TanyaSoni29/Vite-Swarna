/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllGiftCards } from '../services/operations/giftCardApi';

const initialState = {
	loading: false,
	giftCards: [],
	giftCard: null,
};

const giftCardsSlice = createSlice({
	name: 'giftCard',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setGiftCards: (state, action) => {
			state.giftCards = action.payload;
		},
		setGiftCard: (state, action) => {
			state.giftCard = action.payload;
		},
	},
});

export function refreshGiftCards() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getAllGiftCards();
			console.log('refresh all gift cards response ---', response);
			if (response.status === 'success') {
				dispatch(setGiftCards(response.data));
			}
		} catch (error) {
			console.error('Error refreshing gifts Cards:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};
}

export const { setLoading, setGiftCards, setGiftCard } = giftCardsSlice.actions;
export default giftCardsSlice.reducer;
