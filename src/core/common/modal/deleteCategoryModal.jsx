/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategories } from '../../redux/services/operations/categoriesApi';
import { refreshCategories } from '../../redux/slices/categoriesSlice';
import toast from 'react-hot-toast';

const DeleteCategoryModal = () => {
	const dispatch = useDispatch();
	const { category } = useSelector((state) => state.category);

	const handleDeleteSubmit = async () => {
		console.log(category);
		try {
			const response = await deleteCategories(category?.categoryID);
			if (response.status === 'success') {
				dispatch(refreshCategories());
			} else {
				toast.error('Failed to delete Category!');
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
								<h4 className='fs-20 fw-bold mb-2 mt-1'>Delete Category</h4>
								<p className='mb-0 fs-16'>
									Are you sure you want to delete {category?.categoryName}{' '}
									category ?
								</p>
								<div className='modal-footer-btn mt-3 d-flex justify-content-center'>
									<button
										type='button'
										className='btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none'
										data-bs-dismiss='modal'
									>
										Cancel
									</button>
									<Link
										to='#'
										onClick={handleDeleteSubmit}
										data-bs-dismiss='modal'
										className='btn btn-primary fs-13 fw-medium p-2 px-3'
									>
										Yes Delete
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteCategoryModal;
