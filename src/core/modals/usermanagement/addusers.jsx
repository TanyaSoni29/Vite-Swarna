/** @format */

import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
import { refreshUsers } from '../../redux/slices/userSlice';
import toast from 'react-hot-toast';
import { createUsers } from '../../redux/services/operations/userApi';

const AddUsers = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitSuccessful },
	} = useForm();
	// const status = [
	// 	{ value: 'Choose', label: 'Choose' },
	// 	{ value: 'Manager', label: 'Manager' },
	// 	{ value: 'Admin', label: 'Admin' },
	// ];
	const [imageString, setImageString] = useState('');
	// const [showPassword, setShowPassword] = useState(false);
	// const [showConfirmPassword, setConfirmPassword] = useState(false);

	// const handleTogglePassword = () => {
	// 	setShowPassword((prevShowPassword) => !prevShowPassword);
	// };
	// const handleToggleConfirmPassword = () => {
	// 	setConfirmPassword((prevShowPassword) => !prevShowPassword);
	// };

	const onSubmit = async (data) => {
		// console.log(data);
		try {
			const newData = {
				userName: data?.userName || '',
				firstName: data?.firstName || '',
				lastName: data?.lastName || '',
				email: data?.email || '',
				notificationFCM: '',
				phoneNumber: data?.phoneNumber || '',
				address: data?.address || '',
				city: data?.city || '',
				state: data?.state || '',
				country: data?.country || '',
				postalCode: data?.postalCode || '',
				registrationDate: new Date().toISOString(),
				lastLogin: new Date().toISOString() || '',
				isActive: data?.isActive || false,
				profilePicture: data?.profilePicture || '',
				socialMediaLinks: data?.socialMediaLinks || '',
			};
			const response = await createUsers(newData);
			if (response.status === 'success') {
				dispatch(refreshUsers());
			} else {
				toast.error('Failed to create User!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageString(reader.result);
				setValue('profilePicture', imageString);

				// Do something with the image data, e.g., set it in state or display it
				console.log('Image data:', reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				userName: '',
				firstName: '',
				lastName: '',
				email: '',
				notificationFCM: '',
				phoneNumber: '',
				address: '',
				city: '',
				state: '',
				country: '',
				postalCode: '',
				registrationDate: new Date().toISOString(),
				lastLogin: new Date().toISOString(),
				isActive: false,
				profilePicture: '',
				socialMediaLinks: '',
			});
            setImageString('');
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<div>
			{/* Add User */}
			<div
				className='modal fade'
				id='add-units'
			>
				<div className='modal-dialog modal-dialog-centered custom-modal-two'>
					<div className='modal-content'>
						<div className='page-wrapper-new p-0'>
							<div className='content'>
								<div className='modal-header border-0 custom-modal-header'>
									<div className='page-title'>
										<h4>Add User</h4>
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
								<div className='modal-body custom-modal-body'>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className='row'>
											<div className='col-lg-12'>
												<div className='new-employee-field'>
													<span>Avatar</span>
													<div className='profile-pic-upload mb-2'>
														<div className='profile-pic'>
															{imageString ? (
																<img
																	src={imageString}
																	alt='Preview'
																	style={{
																		width: '100px',
																		height: '100px',
																		objectFit: 'cover',
																	}}
																/>
															) : (
																<span>
																	<PlusCircle className='plus-down-add' />
																	Profile Photo
																</span>
															)}
														</div>
														<div className='input-blocks mb-0'>
															<div className='image-upload mb-0'>
																<input
																	type='file'
																	accept='image/*'
																	onChange={handleImageUpload}
																/>
																<div className='image-uploads'>
																	<h4>Change Image</h4>
																</div>
																<input
																	type='hidden'
																	{...register('profilePicture')}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>User Name</label>
													<input
														type='text'
														className='form-control'
														{...register('userName', {
															required: 'User Name is required!',
														})}
													/>
													{errors.userName && (
														<span className='text-danger'>
															{errors.userName.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>First Name</label>
													<input
														type='text'
														className='form-control'
														{...register('firstName', {
															required: 'First Name is required!',
														})}
													/>
													{errors.firstName && (
														<span className='text-danger'>
															{errors.firstName.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Last Name</label>
													<input
														type='text'
														className='form-control'
														{...register('lastName', {
															required: 'Last Name is required!',
														})}
													/>
													{errors.lastName && (
														<span className='text-danger'>
															{errors.lastName.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Phone</label>
													<input
														type='text'
														className='form-control'
														{...register('phoneNumber', {
															required: 'Phone is required!',
														})}
													/>
													{errors.phoneNumber && (
														<span className='text-danger'>
															{errors.phoneNumber.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Email</label>
													<input
														type='email'
														className='form-control'
														{...register('email', {
															required: 'Email is required!',
														})}
													/>
													{errors.email && (
														<span className='text-danger'>
															{errors.email.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Social Media Links</label>
													<input
														type='text'
														className='form-control'
														{...register('socialMediaLinks')}
													/>
													{errors.socialMediaLinks && (
														<span className='text-danger'>
															{errors.socialMediaLinks.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-12'>
												<div className='input-blocks'>
													<label>Address</label>
													<input
														type='text'
														className='form-control'
														{...register('address', {
															required: 'Address is required!',
														})}
													/>
													{errors.address && (
														<span className='text-danger'>
															{errors.address.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>City</label>
													<input
														type='text'
														className='form-control'
														{...register('city', {
															required: 'City is required!',
														})}
													/>
													{errors.city && (
														<span className='text-danger'>
															{errors.city.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>State</label>
													<input
														type='text'
														className='form-control'
														{...register('state', {
															required: 'State is required!',
														})}
													/>
													{errors.state && (
														<span className='text-danger'>
															{errors.state.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Country</label>
													<input
														type='text'
														className='form-control'
														{...register('country', {
															required: 'Country is required!',
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
												<div className='input-blocks'>
													<label>Postal Code</label>
													<input
														type='text'
														className='form-control'
														{...register('postalCode', {
															required: 'PostalCode is required!',
														})}
													/>
													{errors.postalCode && (
														<span className='text-danger'>
															{errors.postalCode.message}
														</span>
													)}
												</div>
											</div>
											<div className='mb-0'>
												<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
													<span className='status-label'>
														Status<span className='text-danger ms-1'>*</span>
													</span>
													<input
														type='checkbox'
														id='user2'
														className='check'
														{...register('isActive')}
														defaultChecked
													/>
													{errors.isActive && (
														<span className='text-danger'>
															{errors.isActive.message}
														</span>
													)}
													<label
														htmlFor='user2'
														className='checktoggle'
													/>
												</div>
											</div>
											{/* <div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Role</label>

													<Select
														classNamePrefix='react-select'
														options={status}
														placeholder='Choose Status'
													/>
												</div>
											</div> */}
											{/* <div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Password</label>
													<div className='pass-group'>
														<input
															type={showPassword ? 'text' : 'password'}
															className='pass-input'
															placeholder='Enter your password'
														/>
														<span
															className={`ti toggle-password ${
																showPassword ? 'ti-eye' : 'ti-eye-off'
															}`}
															onClick={handleTogglePassword}
														/>
													</div>
												</div>
											</div> */}
											{/* <div className='col-lg-6'>
												<div className='input-blocks'>
													<label>Confirm Passworrd</label>
													<div className='pass-group'>
														<input
															type={showConfirmPassword ? 'text' : 'password'}
															className='pass-input'
															placeholder='Enter your password'
														/>
														<span
															className={`ti   toggle-password  ${
																showConfirmPassword ? 'ti-eye' : 'ti-eye-off'
															}`}
															onClick={handleToggleConfirmPassword}
														/>
													</div>
												</div>
											</div> */}
											{/* <div className='col-lg-12'>
												<div className='mb-0 input-blocks'>
													<label className='form-label'>Descriptions</label>
													<textarea
														className='form-control mb-1'
														defaultValue={'Type Message'}
													/>
													<p>Maximum 600 Characters</p>
												</div>
											</div> */}
										</div>
										<div className='modal-footer-btn'>
											<button
												type='button'
												className='btn btn-cancel me-2'
												data-bs-dismiss='modal'
											>
												Cancel
											</button>
											<button
												type='submit'
												data-bs-dismiss='modal'
												className='btn btn-submit'
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Add User */}
		</div>
	);
};

export default AddUsers;
