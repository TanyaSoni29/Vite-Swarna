/** @format */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshStores } from '../../redux/slices/storesSlice';
import { createStores } from '../../redux/services/operations/storesApi';
import { useSelector } from 'react-redux';
import { refreshSellers } from '../../redux/slices/sellerSlice';

const AddStores = () => {
	const dispatch = useDispatch();
	const { sellers } = useSelector((state) => state.seller);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const sellerOptions = sellers.map((seller) => {
		return { value: seller.sellerID, label: seller.businessName };
	});

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
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
				storeName: "",
				ownerName: "",
				address: "",
				city: "",
				postalCode: "",
				description: "",
				email: "",
				phoneNumber1: "",
				phoneNumber2: "",
				isActive: false,
			});
		}
	}, [reset, isSubmitSuccessful]);

	useEffect(() => {
		dispatch(refreshSellers());
	}, [dispatch]);

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
											<span className='text-danger'>
												{errors.email.message}
											</span>
										)}
									</div>

									<div className='mb-3 w-50'>
										<label className='form-label'>
											Seller Name
											<span className='text-danger ms-1'>*</span>
										</label>
										<Select
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
										<span className='text-danger'>
											{errors.address.message}
										</span>
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
											id='user2'
											className='check'
											// checked={watch("isActive")}
											{...register('isActive')}
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
									type='submit'
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
