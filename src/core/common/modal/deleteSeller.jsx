/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { refreshStores } from '../../redux/slices/storesSlice';
import { deleteSellers } from '../../redux/services/operations/sellerApi';

const DeleteSellerModal = () => {
	const dispatch = useDispatch();
	const { seller } = useSelector((state) => state.seller);

	const handleDeleteSubmit = async () => {
		console.log(seller);
		try {
			const response = await deleteSellers(seller?.sellerID);
			if (response.status === 'success') {
				dispatch(refreshStores());
			} else {
				toast.error('Failed to delete Seller!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* Delete Modal */}
			<div
				className='modal fade'
				id='delete-modal'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content p-5'>
						<div className='modal-body text-center p-0'>
							<span className='rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2'>
								<i className='ti ti-trash fs-24 text-danger' />
							</span>
							<h4 className='fs-20 text-gray-9 fw-bold mb-2 mt-1'>
								Delete Seller
							</h4>
							<p className='text-gray-6 mb-0 fs-16'>
								Are you sure you want to delete {seller?.ownerName} seller?
							</p>
							<div className='d-flex justify-content-center mt-3'>
								<button
									type='button'
									className='btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none'
									data-bs-dismiss='modal'
								>
									Cancel
								</button>
								<button
									type='button'
									className='btn btn-primary fs-13 fw-medium p-2 px-3'
									data-bs-dismiss='modal'
									onClick={handleDeleteSubmit}
								>
									Yes Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Delete Modal */}
		</>
	);
};

export default DeleteSellerModal;
