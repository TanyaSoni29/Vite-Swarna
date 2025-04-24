/** @format */

// import { sendLogs } from '../../utils/getLogs';
import toast from 'react-hot-toast';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';
import { sellersEndpoints } from '../apis';

const {
	GET_SELLERS,
	CREATE_SELLERS,
	GET_SELLERS_BY_ID,
	UPDATE_SELLERS,
	DELETE_SELLERS,
} = sellersEndpoints;

export async function getAllSellers() {
	const response = await handleGetReq(GET_SELLERS);
	console.log('get all sellers response ---', response);

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

export async function getSellersById(id) {
	const response = await handleGetReq(GET_SELLERS_BY_ID(id));
	console.log('get seller by id response ---', response);

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

export async function createSellers(data) {
	const response = await handlePostReq(CREATE_SELLERS, data);
	console.log('create sellers response ---', response);

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
		toast.success('Seller Created Successfully');
		return response;
	}
	return null;
}

export async function updateSellers(id, data) {
	const response = await handlePutReq(UPDATE_SELLERS(id), data);
	console.log('update seller response ---', response);

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
		toast.success('Seller Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteSellers(id) {
	const response = await handleDeleteReq(DELETE_SELLERS(id));
	console.log('delete seller response ---', response);
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
		toast.success('Seller Deleted Successfully');
		return response;
	}
	return false;
}
