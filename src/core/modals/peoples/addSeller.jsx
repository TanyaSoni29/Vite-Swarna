/** @format */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshStores } from '../../redux/slices/storesSlice';
import { createStores } from '../../redux/services/operations/storesApi';
// import { useSelector } from 'react-redux';
import { refreshSellers } from '../../redux/slices/sellerSlice';

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
				storeName: '',
				ownerName: '',
				address: '',
				city: '',
				postalCode: '',
				description: '',
				email: '',
				phoneNumber1: '',
				phoneNumber2: '',
				isActive: false,
			});
		}
	}, [reset, isSubmitSuccessful]);

	useEffect(() => {
		dispatch(refreshSellers());
	}, [dispatch]);

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
								<h4>Add Supplier</h4>
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
											/>
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
													defaultChecked
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
									Add Supplier
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
