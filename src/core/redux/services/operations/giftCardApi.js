/** @format */

// import { sendLogs } from '../../utils/getLogs';
import toast from 'react-hot-toast';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';
import { giftCardsEndpoints } from '../apis';

const {
	GET_GIFT_CARDS,
	CREATE_GIFT_CARDS,
	GET_GIFT_CARDS_BY_ID,
	UPDATE_GIFT_CARDS,
	DELETE_GIFT_CARDS,
} = giftCardsEndpoints;

export async function getAllGiftCards() {
	const response = await handleGetReq(GET_GIFT_CARDS);
	console.log('get all gift cards response ---', response);

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

export async function getCouponsById(id) {
	const response = await handleGetReq(GET_GIFT_CARDS_BY_ID(id));
	console.log('get gifts card by id response ---', response);

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

export async function createGiftCards(data) {
	const response = await handlePostReq(CREATE_GIFT_CARDS, data);
	console.log('create gift cards response ---', response);

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
		toast.success('Gift Card Created Successfully');
		return response;
	}
	return null;
}

export async function updateGiftCards(id, data) {
	const response = await handlePutReq(UPDATE_GIFT_CARDS(id), data);
	console.log('update gift cards response ---', response);

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
		toast.success('Gift Card Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteGiftCards(id) {
	const response = await handleDeleteReq(DELETE_GIFT_CARDS(id));
	console.log('delete gift cards response ---', response);
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
		toast.success('Gift Card Deleted Successfully');
		return response;
	}
	return false;
}
