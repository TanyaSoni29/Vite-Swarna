/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteUsers } from '../../redux/services/operations/userApi';
import { refreshUsers } from '../../redux/slices/userSlice';

const DeleteUserModal = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	console.log(user);
	const handleDeleteSubmit = async () => {
		try {
			const response = await deleteUsers(user?.userID);
			if (response.status === 'success') {
				dispatch(refreshUsers());
			} else {
				toast.error('Failed to delete User!');
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
					<div className='modal-content'>
						<div className='page-wrapper-new p-0'>
							<div className='content p-5 px-3 text-center'>
								<span className='rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2'>
									<i className='ti ti-trash fs-24 text-danger' />
								</span>
								<h4 className='fs-20 fw-bold mb-2 mt-1'>Delete User</h4>
								<p className='mb-0 fs-16'>
									Are you sure you want to delete {user?.userName} user?
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
										className='btn btn-primary fs-13 fw-medium p-2 px-3'
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
			{/* /Delete Modal */}
		</>
	);
};

export default DeleteUserModal;
