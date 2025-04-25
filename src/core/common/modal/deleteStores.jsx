/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteStores } from '../../redux/services/operations/storesApi';
import { refreshStores } from '../../redux/slices/storesSlice';

const DeleteStoresModal = () => {
	const dispatch = useDispatch();
	const { store } = useSelector((state) => state.store);

	const handleDeleteSubmit = async () => {
		console.log(store);
		try {
			const response = await deleteStores(store?.storeID);
			if (response.status === 'success') {
				dispatch(refreshStores());
			} else {
				toast.error('Failed to delete Store!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* delete modal */}
			<div
				className='modal fade'
				id='delete-modal'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='page-wrapper-new p-0'>
							<div className='content p-5 px-3 text-center'>
								<span className='rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2'>
									<i className='ti ti-trash fs-24 text-danger' />
								</span>
								<h4 className='fs-20 text-gray-9 fw-bold mb-2 mt-1'>
									Delete Store
								</h4>
								<p className='text-gray-6 mb-0 fs-16'>
									Are you sure you want to delete {store?.storeName} Store?
								</p>
								<div className='modal-footer-btn mt-3 d-flex justify-content-center'>
									<button
										type='button'
										className='btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none'
										data-bs-dismiss='modal'
									>
										Cancel
									</button>
									<button
										type='button'
										data-bs-dismiss='modal'
										className='btn btn-submit fs-13 fw-medium p-2 px-3'
										onClick={handleDeleteSubmit}
									>
										Yes Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteStoresModal;
