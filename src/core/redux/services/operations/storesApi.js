/** @format */

// import { sendLogs } from '../../utils/getLogs';
import toast from 'react-hot-toast';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';
import { storesEndpoints } from '../apis';

const {
	GET_STORES,
	CREATE_STORES,
	GET_STORES_BY_ID,
	UPDATE_STORES,
	DELETE_STORES,
} = storesEndpoints;

export async function getAllStores() {
	const response = await handleGetReq(GET_STORES);
	console.log('get all stores response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_LOCAL_POI2,
		// 		reqBody: searchTerm,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
	return null;
}

export async function getStoresById(id) {
	const response = await handleGetReq(GET_STORES_BY_ID(id));
	console.log('get stores by id response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: GET_LOCAL_POI2,
		// 		reqBody: searchTerm,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		return response;
	}
	return null;
}

export async function createStores(data) {
	const response = await handlePostReq(CREATE_STORES, data);
	console.log('create stores response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: CREATE_LOCAL_POI,
		// 		reqBody: data,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		toast.success('Store Created Successfully');
		return response;
	}
	return null;
}

export async function updateStores(id, data) {
	const response = await handlePutReq(UPDATE_STORES(id), data);
	console.log('update stores response ---', response);

	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: UPDATE_LOCAL_POI,
		// 		reqBody: data,
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		toast.success('Store Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteStores(id) {
	const response = await handleDeleteReq(DELETE_STORES(id));
	console.log('delete stores response ---', response);
	if (response.status === 'success') {
		// sendLogs(
		// 	{
		// 		url: DELETE_LOCAL_POI,
		// 		reqBody: { id },
		// 		headers: setHeaders(),
		// 		response: response,
		// 	},
		// 	'info'
		// );
		toast.success('Store Deleted Successfully');
		return response;
	}
	return false;
}
