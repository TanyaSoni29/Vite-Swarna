/** @format */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { refreshSellers } from '../../redux/slices/sellerSlice';
import { createSellers } from '../../redux/services/operations/sellerApi';

const AddSellers = () => {
	const dispatch = useDispatch();
	// const { sellers } = useSelector((state) => state.seller);
	const {
		register,
		handleSubmit,
		reset,
		// setValue,
		// trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	// const sellerOptions = sellers.map((seller) => {
	// 	return { value: seller.sellerID, label: seller.businessName };
	// });

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
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
			const response = await createSellers(newData);
			if (response.status === 'success') {
				dispatch(refreshSellers());
			} else {
				toast.error('Failed to create Seller!');
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
		<div>
			{/* Add Supplier */}
			<div
				className='modal fade'
				id='add-supplier'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<div className='page-title'>
								<h4>Add Seller</h4>
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
											<div className='profile-pic-upload mb-2'>
												<div className='profile-pic'>
													<span>
														<i
															data-feather='plus-circle'
															className='plus-down-add'
														/>
														Add Image
													</span>
												</div>
												<div className='mb-0'>
													<div className='image-upload mb-2'>
														<input type='file' />
														<div className='image-uploads'>
															<h4>Upload Image</h4>
														</div>
													</div>
													<p>JPEG, PNG up to 2 MB</p>
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
									<div className='col-lg-6'>
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
									<div className='col-lg-6'>
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
									Add Seller
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* /Add Supplier */}
		</div>
	);
};

export default AddSellers;
