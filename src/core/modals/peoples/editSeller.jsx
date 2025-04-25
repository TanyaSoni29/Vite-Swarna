/** @format */

import React, { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { refreshStores } from '../../redux/slices/storesSlice';
import { updateStores } from '../../redux/services/operations/storesApi';
import ImageWithBasePath from '../../img/imagewithbasebath';
// import Select from 'react-select';

const EditSellers = () => {
	const dispatch = useDispatch();
	const { sellers } = useSelector((state) => state.seller);
	const { store } = useSelector((state) => state.store);
	console.log('store for edit', store);
	const {
		register,
		handleSubmit,
		reset,
		// watch,
		setValue,
		// trigger,
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
			id='edit-supplier'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='content'>
						<div className='modal-header'>
							<div className='page-title'>
								<h4>Edit Supplier</h4>
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
								<div className='row'>
									<div className='col-lg-12'>
										<div className='new-employee-field'>
											<div className='profile-pic-upload edit-pic'>
												<div className='profile-pic'>
													<span>
														<ImageWithBasePath
															src='assets/img/supplier/edit-supplier.jpg'
															alt='Img'
														/>
													</span>
													<div className='close-img'>
														<i
															data-feather='x'
															className='info-img'
														/>
													</div>
												</div>
												<div className='mb-0'>
													<div className='image-upload mb-0'>
														<input type='file' />
														<div className='image-uploads'>
															<h4>Change Image</h4>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='col-lg-6'>
										<div className='mb-3'>
											<label className='form-label'>
												First Name <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												{...register('sellerName', {
													required: 'Seller Name is Required!',
												})}
											/>
											{errors.sellerName && (
												<span className='text-danger'>
													{errors.sellerName.message}
												</span>
											)}
										</div>
									</div>
									<div className='col-lg-6'>
										<div className='mb-3'>
											<label className='form-label'>
												Last Name <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												defaultValue='Computers'
											/>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='mb-3'>
											<label className='form-label'>
												Email <span className='text-danger'>*</span>
											</label>
											<input
												type='email'
												className='form-control'
												defaultValue='carlevans@example.com'
											/>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='mb-3'>
											<label className='form-label'>
												Phone <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												defaultValue={+15964712634}
											/>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='mb-3'>
											<label className='form-label'>
												Address <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												defaultValue='46 Perry Street'
											/>
										</div>
									</div>
									<div className='col-lg-6 col-sm-10 col-10'>
										<div className='mb-3'>
											<label className='form-label'>
												City <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
											/>
										</div>
									</div>
									<div className='col-lg-6 col-sm-10 col-10'>
										<div className='mb-3'>
											<label className='form-label'>
												State <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
											/>
										</div>
									</div>
									<div className='col-lg-6 col-sm-10 col-10'>
										<div className='mb-3'>
											<label className='form-label'>
												Country <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
											/>
										</div>
									</div>
									<div className='col-lg-6'>
										<div className='mb-3'>
											<label className='form-label'>
												Postal Code <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												defaultValue={10176}
											/>
										</div>
									</div>
									<div className='col-md-12'>
										<div className='mb-0'>
											<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
												<span className='status-label'>Status</span>
												<input
													type='checkbox'
													id='users6'
													className='check'
													defaultChecked
												/>
												<label
													htmlFor='users6'
													className='checktoggle mb-0'
												/>
											</div>
										</div>
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
	);
};

export default EditSellers;
