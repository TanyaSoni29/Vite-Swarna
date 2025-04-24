/** @format */

import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { updateCategories } from '../../redux/services/operations/categoriesApi';
import { refreshCategories } from '../../redux/slices/categoriesSlice';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import Select from 'react-select';

const EditStores = () => {
	const dispatch = useDispatch();
	const { categories, category } = useSelector((state) => state.category);
	console.log('category for edit', category);
	const {
		register,
		handleSubmit,
		reset,
		// watch,
		setValue,
		// trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const parentCategoryOptions = useMemo(() => {
		return categories.map((category) => ({
			value: category.categoryID,
			label: category.categoryName,
		}));
	}, [categories]);

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				categoryID: category?.categoryID,
				categoryName: data?.categoryName,
				parentCategoryID: data?.parentCategoryID?.value || null,
			};
			const response = await updateCategories(category?.categoryID, newData);
			if (response.status === 'success') {
				dispatch(refreshCategories());
			} else {
				toast.error('Failed to update Category!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	useEffect(() => {
		if (category?.categoryID) {
			const matchedOption = parentCategoryOptions.find(
				(opt) => opt.value === category.parentCategoryID
			);
			setValue('categoryName', category.categoryName);
			setValue('parentCategoryID', matchedOption || null);
		}
	}, [
		category?.categoryID,
		category?.categoryName,
		category?.parentCategoryID,
		parentCategoryOptions,
		setValue,
	]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				categoryName: '',
				parentCategoryID: null,
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<div
			className='modal fade'
			id='edit-store'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<div className='page-title'>
							<h4>Edit Store</h4>
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
									User Name <span className='text-danger'>*</span>
								</label>
								<input
									type='text'
									className='form-control'
									defaultValue='johnsmith'
								/>
							</div>
							<div className='input-blocks mb-3'>
								<label className='form-label'>
									Password <span className='text-danger'>*</span>
								</label>
								<div className='pass-group'>
									<input
										type='password'
										className='form-control pass-input'
										defaultValue='********'
									/>
									<span className='fas toggle-password fa-eye-slash' />
								</div>
							</div>
							<div className='mb-3'>
								<label className='form-label'>
									Email <span className='text-danger'>*</span>
								</label>
								<input
									type='email'
									className='form-control'
									defaultValue='electromart@example.com'
								/>
							</div>
							<div className='mb-3'>
								<label className='form-label'>
									Phone <span className='text-danger'>*</span>
								</label>
								<input
									type='text'
									className='form-control'
									defaultValue={+12498345785}
								/>
							</div>
							<div className='mb-0'>
								<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
									<span className='status-label '>Status</span>
									<input
										type='checkbox'
										id='user1'
										className='check'
										defaultChecked
									/>
									<label
										htmlFor='user1'
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
								save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditStores;
