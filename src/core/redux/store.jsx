/** @format */

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import themeSettingSlice from './themeSettingSlice';
import authReducer from './slices/authSlice';
import adsReducer from './slices/adSlice';
import categoryReducer from './slices/categoriesSlice';
import storeReducer from './slices/storesSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		ads: adsReducer,
		category: categoryReducer,
		store: storeReducer,
		rootReducer: rootReducer,
		themeSetting: themeSettingSlice,
	},
});

export default store;
