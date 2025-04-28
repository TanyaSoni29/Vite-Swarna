/** @format */

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import ImageWithBasePath from '../../img/imagewithbasebath';
import { updateSellers } from '../../redux/services/operations/sellerApi';
import { refreshSellers } from '../../redux/slices/sellerSlice';
// import Select from 'react-select';

const EditSellers = () => {
	const dispatch = useDispatch();
	const { seller } = useSelector((state) => state.seller);
	// const { store } = useSelector((state) => state.store);
	console.log('seller for edit', seller);
	const {
		register,
		handleSubmit,
		reset,
		// watch,
		setValue,
		// trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	// const sellerOptions = useMemo(() => {
	// 	return sellers.map((seller) => ({
	// 		value: seller.sellerID,
	// 		label: seller.businessName,
	// 	}));
	// }, [sellers]);

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				storeID: seller?.sellerID,
				businessName: data?.businessName,
				ownerName: data?.ownerName,
				brandName: data?.brandName,
				email: data?.email,
				description: data?.description,
				phoneNumber1: data?.phoneNumber1,
				phoneNumber2: data?.phoneNumber2,
				address: data?.address,
				city: data?.city,
				state: data?.state,
				country: data?.country,
				postalCode: data?.postalCode,
				isActive: data?.isActive || false,
				isPremium: data?.isPremium || false,
			};
			const response = await updateSellers(seller?.sellerID, newData);
			if (response.status === 'success') {
				dispatch(refreshSellers());
			} else {
				toast.error('Failed to update Seller!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	useEffect(() => {
		// if (store?.storeID) {
		// 	const matchedOption = sellerOptions.find(
		// 		(opt) => opt.value === store.sellerID
		// 	);
		setValue('businessName', seller.businessName);
		setValue('ownerName', seller.ownerName);
		setValue('brandName', seller.brandName);
		setValue('email', seller.email);
		setValue('description', seller.description);
		setValue('phoneNumber1', seller.phoneNumber1);
		setValue('phoneNumber2', seller.phoneNumber2);
		setValue('address', seller.address);
		setValue('city', seller.city);
		setValue('state', seller.state);
		setValue('country', seller.country);
		setValue('postalCode', seller.postalCode);
		setValue('isActive', seller.isActive);
		setValue('isPremium', seller.isPremium);
		// setValue('sellerID', matchedOption || null);
		// }
	}, [
		seller?.businessName,
		seller?.ownerName,
		seller?.brandName,
		seller?.email,
		seller?.description,
		seller?.phoneNumber1,
		seller?.phoneNumber2,
		seller?.address,
		seller?.city,
		seller?.state,
		seller?.country,
		seller?.postalCode,
		seller?.isActive,
		seller?.isPremium,
		setValue,
	]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				businessName: '',
				ownerName: '',
				brandName: '',
				email: '',
				description: '',
				phoneNumber1: '',
				phoneNumber2: '',
				address: '',
				city: '',
				state: '',
				country: '',
				postalCode: '',
				isActive: false,
				isPremium: false,
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
												Business Name <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												{...register('businessName', {
													required: 'Business Name is Required!',
												})}
											/>
											{errors.businessName && (
												<span className='text-danger'>
													{errors.businessName.message}
												</span>
											)}
										</div>
									</div>
									<div className='col-lg-6'>
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
									</div>
									<div className='col-lg-12'>
										<div className='mb-3'>
											<label className='form-label'>
												Brand Name <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												{...register('brandName', {
													required: 'Brand Name is Required!',
												})}
											/>
											{errors.brandName && (
												<span className='text-danger'>
													{errors.brandName.message}
												</span>
											)}
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
												{...register('email', {
													required: 'Email is Required!',
												})}
											/>
											{errors.email && (
												<span className='text-danger'>
													{errors.email.message}
												</span>
											)}
										</div>
									</div>
									<div className='col-lg-12'>
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
									</div>
									<div className='col-lg-6'>
										<div className='mb-3'>
											<label className='form-label'>
												Phone <span className='text-danger'>*</span>
											</label>
											<input
												type='text'
												className='form-control'
												{...register('phoneNumber1', {
													required: 'Phone is Required!',
												})}
											/>
											{errors.phoneNumber1 && (
												<span className='text-danger'>
													{errors.phoneNumber1.message}
												</span>
											)}
										</div>
									</div>
									<div className='col-lg-6'>
										<div className='mb-3'>
											<label className='form-label'>
												Phone 2{/* <span className='text-danger'>*</span> */}
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
									<div className='col-lg-12'>
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
									</div>
									<div className='col-lg-6 col-sm-10 col-10'>
										<div className='mb-3'>
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
												<span className='text-danger'>
													{errors.city.message}
												</span>
											)}
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
												{...register('state', {
													required: 'State is Required!',
												})}
											/>
											{errors.state && (
												<span className='text-danger'>
													{errors.state.message}
												</span>
											)}
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
												{...register('country', {
													required: 'Country is Required!',
												})}
											/>
											{errors.country && (
												<span className='text-danger'>
													{errors.country.message}
												</span>
											)}
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
									<div className='col-md-12'>
										<div className='mb-0'>
											<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
												<span className='status-label'>Status</span>
												<input
													type='checkbox'
													id='users5'
													className='check'
													{...register('isActive')}
												/>
												<label
													htmlFor='users5'
													className='checktoggle mb-0'
												/>
											</div>
										</div>
									</div>
									<div className='col-md-12'>
										<div className='mb-0'>
											<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
												<span className='status-label'>Premium</span>
												<input
													type='checkbox'
													id='users5'
													className='check'
													{...register('isPremium')}
												/>
												<label
													htmlFor='users5'
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
