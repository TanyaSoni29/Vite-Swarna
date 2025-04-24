/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/operations/userApi';

const initialState = {
	loading: false,
	users: [],
	user: null,
};

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export function refreshUsers() {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await getAllUsers();
			console.log('refresh all users response ---', response);
			if (response.status === 'success') {
				const array = Object.keys(response)
					.filter((key) => key !== 'status')
					.map((key) => response[key]);
				dispatch(setUsers(array));
			}
		} catch (error) {
			console.error('Error refreshing users:', error);
		}
	};
}

export const { setLoading, setUsers, setUser } = usersSlice.actions;
export default usersSlice.reducer;
