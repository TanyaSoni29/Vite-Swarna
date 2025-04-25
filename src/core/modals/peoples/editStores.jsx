/** @format */

import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { refreshStores } from '../../redux/slices/storesSlice';
import { updateStores } from '../../redux/services/operations/storesApi';
import Select from 'react-select';

const EditStores = () => {
	const dispatch = useDispatch();
	const { sellers } = useSelector((state) => state.seller);
	const { store } = useSelector((state) => state.store);
	console.log('store for edit', store);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const sellerOptions = useMemo(() => {
		return sellers.map((seller) => ({
			value: seller.sellerID,
			label: seller.businessName,
		}));
	}, [sellers]);

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				storeID: store?.storeID,
				sellerID: data?.sellerID?.value || null,
				storeName: data?.storeName,
				ownerName: data?.ownerName,
				address: data?.address,
				city: data?.city,
				postalCode: data?.postalCode,
				description: data?.description,
				email: data?.email,
				phoneNumber1: data?.phoneNumber1,
				phoneNumber2: data?.phoneNumber2,
				isActive: data?.isActive || false,
			};
			const response = await updateStores(store?.storeID, newData);
			if (response.status === 'success') {
				dispatch(refreshStores());
			} else {
				toast.error('Failed to update Store!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	useEffect(() => {
		if (store?.storeID) {
			const matchedOption = sellerOptions.find(
				(opt) => opt.value === store.sellerID
			);
			setValue('storeName', store.storeName);
			setValue('ownerName', store.ownerName);
			setValue('email', store.email);
			setValue('description', store.description);
			setValue('address', store.address);
			setValue('city', store.city);
			setValue('postalCode', store.postalCode);
			setValue('phoneNumber1', store.phoneNumber1);
			setValue('phoneNumber2', store.phoneNumber2);
			setValue('isActive', store.isActive);
			setValue('sellerID', matchedOption || null);
		}
	}, [
		store?.storeID,
		store?.storeName,
		store?.sellerID,
		store?.ownerName,
		store?.email,
		store?.description,
		store?.address,
		store?.city,
		store?.postalCode,
		store?.phoneNumber1,
		store?.phoneNumber2,
		store?.isActive,
		sellerOptions,
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
							<div className='d-flex justify-content-center align-item-center'>
								<div className='mb-3 w-50 me-2'>
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
								<div className='mb-3 w-50'>
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
							</div>
							<div className='d-flex justify-content-center align-item-center'>
								<div className='mb-3 w-50 me-2'>
									<label className='form-label'>
										Email <span className='text-danger'>*</span>
									</label>
									<input
										type='email'
										className='form-control'
										{...register('email', { required: 'Email is Required!' })}
									/>
									{errors.email && (
										<span className='text-danger'>{errors.email.message}</span>
									)}
								</div>

								<div className='mb-3 w-50'>
									<label className='form-label'>
										Seller Name
										<span className='text-danger ms-1'>*</span>
									</label>
									<Select
										value={watch('sellerID')}
										classNamePrefix='react-select'
										options={sellerOptions}
										placeholder='Choose'
										onChange={(selectedOption) => {
											setValue('sellerID', selectedOption);
											trigger('sellerID'); // optional: triggers validation
										}}
									/>
									{errors.sellerID && (
										<span className='text-danger'>
											{errors.sellerID.message}
										</span>
									)}
								</div>
							</div>
							<div className='mb-3'>
								<label className='form-label'>
									Description <span className='text-danger'>*</span>
								</label>
								<input
									type='text'
									className='form-control'
									{...register('description', {
										required: 'Description is Required!',
									})}
								/>
								{errors.description && (
									<span className='text-danger'>
										{errors.description.message}
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
									<span className='text-danger'>{errors.address.message}</span>
								)}
							</div>
							<div className='d-flex justify-content-between align-items-center'>
								<div className='mb-3 w-50 me-2'>
									<label className='form-label'>
										City <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('city', {
											required: 'City is Required!',
										})}
									/>
									{errors.city && (
										<span className='text-danger'>{errors.city.message}</span>
									)}
								</div>
								<div className='mb-3 w-50'>
									<label className='form-label'>
										Postal Code <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('postalCode', {
											required: 'Postal Code is Required!',
										})}
									/>
									{errors.postalCode && (
										<span className='text-danger'>
											{errors.postalCode.message}
										</span>
									)}
								</div>
							</div>
							<div className='d-flex justify-content-between align-items-center'>
								<div className='mb-3 w-50 me-2'>
									<label className='form-label'>
										Phone <span className='text-danger'>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										{...register('phoneNumber1', {
											required: 'Phone Number is Required!',
										})}
									/>
									{errors.phoneNumber1 && (
										<span className='text-danger'>
											{errors.phoneNumber1.message}
										</span>
									)}
								</div>
								<div className='mb-3 w-50'>
									<label className='form-label'>
										Phone 2
										{/* Phone 2 <span className='text-danger'>*</span> */}
									</label>
									<input
										type='text'
										className='form-control'
										{...register('phoneNumber2')}
									/>
									{errors.phoneNumber2 && (
										<span className='text-danger'>
											{errors.phoneNumber2.message}
										</span>
									)}
								</div>
							</div>
							<div className='mb-0'>
								<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
									<span className='status-label '>Status</span>
									<input
										type='checkbox'
										id='user1'
										className='check'
										{...register('isActive')}
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
								type='submit'
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
