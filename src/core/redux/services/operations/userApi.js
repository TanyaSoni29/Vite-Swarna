/** @format */

// import { sendLogs } from '../../utils/getLogs';
import toast from 'react-hot-toast';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';
import { usersEndpoints } from '../apis';

const {
	GET_USERS,
	CREATE_USERS,
	GET_USERS_BY_ID,
	UPDATE_USERS,
	DELETE_USERS
} = usersEndpoints;

export async function getAllUsers() {
	const response = await handleGetReq(GET_USERS);
	console.log('get all users response ---', response);

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

export async function getUsersById(id) {
	const response = await handleGetReq(GET_USERS_BY_ID(id));
	console.log('get users by id response ---', response);

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

export async function createUsers(data) {
	const response = await handlePostReq(CREATE_USERS, data);
	console.log('create users response ---', response);

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
		toast.success('User Created Successfully');
		return response;
	}
	return null;
}

export async function updateUsers(id, data) {
	const response = await handlePutReq(UPDATE_USERS(id), data);
	console.log('update users response ---', response);

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
		toast.success('User Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteUsers(id) {
	const response = await handleDeleteReq(DELETE_USERS(id));
	console.log('delete users response ---', response);
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
		toast.success('User Deleted Successfully');
		return response;
	}
	return false;
}
