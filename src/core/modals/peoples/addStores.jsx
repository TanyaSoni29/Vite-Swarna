/** @format */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshStores } from '../../redux/slices/storesSlice';
import { createStores } from '../../redux/services/operations/storesApi';

const AddStores = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		// setValue,
		// trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				categoryName: data?.categoryName,
				parentCategoryID: data?.parentCategoryID?.value || null,
			};
			const response = await createStores(newData);
			if (response.status === 'success') {
				dispatch(refreshStores());
			} else {
				toast.error('Failed to create Store!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				categoryName: '',
				parentCategoryID: null,
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<div>
			{/* Add Store */}
			<div
				className='modal fade'
				id='add-store'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<div className='page-title'>
								<h4>Add Store</h4>
							</div>
							<button
								type='button'
								className='close'
								data-bs-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label className='form-label'>
										Store Name <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('storeName', {
											required: 'Store Name is Required!',
										})}
									/>
									{errors.storeName && (
										<span className='text-danger'>
											{errors.storeName.message}
										</span>
									)}
								</div>
								<div className='mb-3'>
									<label className='form-label'>
										Owner Name <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('ownerName', {
											required: 'Owner Name is Required!',
										})}
									/>
									{errors.ownerName && (
										<span className='text-danger'>
											{errors.ownerName.message}
										</span>
									)}
								</div>
								<div className='mb-3'>
									<label className='form-label'>
										Address <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('address', {
											required: 'Address is Required!',
										})}
									/>
									{errors.address && (
										<span className='text-danger'>
											{errors.address.message}
										</span>
									)}
								</div>
								<div className='mb-3'>
									<label className='form-label'>
										Email <span className='text-danger'>*</span>
									</label>
									<input
										type='email'
										className='form-control'
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>
										Phone <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
									/>
								</div>
								<div className='mb-0'>
									<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
										<span className='status-label '>Status</span>
										<input
											type='checkbox'
											id='user2'
											className='check'
											defaultChecked
										/>
										<label
											htmlFor='user2'
											className='checktoggle'
										/>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
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
									className='btn btn-primary fs-13 fw-medium p-2 px-3'
								>
									Add Store
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* /Add Store */}
		</div>
	);
};

export default AddStores;
