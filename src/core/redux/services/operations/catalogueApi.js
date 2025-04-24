/** @format */

// import { sendLogs } from '../../utils/getLogs';
import toast from 'react-hot-toast';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';
import { catalogueImagesEndpoints, cataloguesEndpoints } from '../apis';

const {
	GET_CATALOGUES,
	CREATE_CATALOGUES,
	GET_CATALOGUES_BY_ID,
	UPDATE_CATALOGUES,
	DELETE_CATALOGUES,
} = cataloguesEndpoints;

const {
	GET_CATALOGUE_IMAGES,
	CREATE_CATALOGUE_IMAGES,
	GET_CATALOGUE_IMAGE_BY_ID,
	UPDATE_CATALOGUE_IMAGE,
	DELETE_CATALOGUE_IMAGE,
} = catalogueImagesEndpoints;

export async function getAllCatalogues() {
	const response = await handleGetReq(GET_CATALOGUES);
	console.log('get all catalogues response ---', response);

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

export async function getCataloguesById(id) {
	const response = await handleGetReq(GET_CATALOGUES_BY_ID(id));
	console.log('get catalogues by id response ---', response);

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

export async function createCatalogues(data) {
	const response = await handlePostReq(CREATE_CATALOGUES, data);
	console.log('create catalogues response ---', response);

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
		toast.success('Catalogue Created Successfully');
		return response;
	}
	return null;
}

export async function updateCatalogues(id, data) {
	const response = await handlePutReq(UPDATE_CATALOGUES(id), data);
	console.log('update catalogues response ---', response);

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
		toast.success('Catalogue Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteCatalogues(id) {
	const response = await handleDeleteReq(DELETE_CATALOGUES(id));
	console.log('delete catalogue response ---', response);
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
		toast.success('Catalogue Deleted Successfully');
		return response;
	}
	return false;
}

export async function getAllCataloguesImages() {
	const response = await handleGetReq(GET_CATALOGUE_IMAGES);
	console.log('get all catalogues images response ---', response);

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

export async function getCataloguesImagesById(id) {
	const response = await handleGetReq(GET_CATALOGUE_IMAGE_BY_ID(id));
	console.log('get catalogues images by id response ---', response);

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

export async function createCataloguesImages(data) {
	const response = await handlePostReq(CREATE_CATALOGUE_IMAGES, data);
	console.log('create catalogues images response ---', response);

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
		toast.success('Catalogue Image Created Successfully');
		return response;
	}
	return null;
}

export async function updateCataloguesImages(id, data) {
	const response = await handlePutReq(UPDATE_CATALOGUE_IMAGE(id), data);
	console.log('update catalogues images response ---', response);

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
		toast.success('Catalogue Image Updated Successfully');
		return response;
	}
	return null;
}

export async function deleteCataloguesImages(id) {
	const response = await handleDeleteReq(DELETE_CATALOGUE_IMAGE(id));
	console.log('delete catalogue images response ---', response);
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
		toast.success('Catalogue Image Deleted Successfully');
		return response;
	}
	return false;
}
