/** @format */

import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { updateCategories } from '../../redux/services/operations/categoriesApi';
import { refreshCategories } from '../../redux/slices/categoriesSlice';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

const EditCategoryList = () => {
	const dispatch = useDispatch();
	const { categories, category } = useSelector((state) => state.category);
	console.log('category for edit', category);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		trigger,
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
			setValue('categoryName', category?.categoryName);
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
			id='edit-category'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='page-wrapper-new p-0'>
						<div className='content'>
							<div className='modal-header'>
								<div className='page-title'>
									<h4>Edit Category</h4>
								</div>
								<button
									type='button'
									className='close bg-danger text-white fs-16'
									data-bs-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>×</span>
								</button>
							</div>
							<div className='modal-body'>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className='mb-3'>
										<label className='form-label'>
											Category<span className='text-danger ms-1'>*</span>
										</label>
										<input
											type='text'
											className='form-control'
											{...register('categoryName', {
												required: 'Category Name is Required!',
											})}
										/>
										{errors.categoryName && (
											<span className='text-danger'>
												{errors.categoryName.message}
											</span>
										)}
									</div>
									<div className='mb-3'>
										<label className='form-label'>
											Parent Category
											<span className='text-danger ms-1'>*</span>
										</label>
										<Select
											value={watch('parentCategoryID')}
											classNamePrefix='react-select'
											options={parentCategoryOptions}
											placeholder='Choose'
											onChange={(selectedOption) => {
												setValue('parentCategoryID', selectedOption);
												trigger('parentCategoryID'); // optional: triggers validation
											}}
										/>
										{errors.parentCategoryID && (
											<span className='text-danger'>
												{errors.parentCategoryID.message}
											</span>
										)}
									</div>
									{/* <div className='mb-3'>
										<label className='form-label'>
											Category Slug<span className='text-danger ms-1'>*</span>
										</label>
										<input
											type='text'
											className='form-control'
											defaultValue='computers'
										/>
									</div> */}
									{/* <div className='mb-0'>
										<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
											<span className='status-label'>
												Status<span className='text-danger ms-1'>*</span>
											</span>
											<input
												type='checkbox'
												id='user3'
												className='check'
												defaultChecked
											/>
											<label
												htmlFor='user3'
												className='checktoggle'
											/>
										</div>
									</div> */}
									<div className='modal-footer p-0 pt-3'>
										<button
											type='button'
											className='btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none'
											data-bs-dismiss='modal'
										>
											Cancel
										</button>
										<button
											type='submit'
											data-bs-dismiss='modal'
											className='btn btn-primary fs-13 fw-medium p-2 px-3'
										>
											Save Changes
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCategoryList;
