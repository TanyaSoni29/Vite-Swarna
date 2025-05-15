/** @format */

import { DatePicker } from 'antd';
import { Calendar } from 'feather-icons-react/build/IconComponents';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Select from 'react-select';
// import TextEditor from '../../../feature-module/inventory/texteditor';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCoupons } from '../../redux/services/operations/couponsApi';
import { refreshCoupons } from '../../redux/slices/couponsSlice';
import toast from 'react-hot-toast';
// import dayjs from 'dayjs';

const AddCoupons = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedDate1, setSelectedDate1] = useState(null);

	// const list = [
	//   { value: "choose", label: "Choose" },
	//   { value: "nikeJordan", label: "Nike Jordan" },
	//   { value: "amazonEchoDot", label: "Amazon Echo Dot" },
	// ];

	const price = [
		{ value: 'choose', label: 'Choose Type' },
		{ value: 'fixed', label: 'Fixed' },
		{ value: 'percentage', label: 'Percentage' },
	];

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				couponCode: data?.couponCode || '',
				discountType: data?.discountType?.value || '',
				discountValue: data?.discountValue || 0,
				minOrderAmount: data?.minOrderAmount || 0,
				startDate:
					new Date(selectedDate).toISOString() || new Date().toISOString(),
				endDate:
					new Date(selectedDate1).toISOString() || new Date().toISOString(),
				usageLimit: data?.usageLimit || 0,
				timesUsed: data?.timesUsed || 0,
				isActive: data?.isActive || true,
			};
			const response = await createCoupons(newData);
			if (response.status === 'success') {
				dispatch(refreshCoupons());
			} else {
				toast.error('Failed to create Coupons!');
			}
		} catch (error) {
			console.error(error);
		} finally {
			reset();
		}
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleDateChange1 = (date) => {
		setSelectedDate1(date);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				couponCode: '',
				discountType: '',
				discountValue: 0,
				minOrderAmount: 0,
				startDate: null,
				endDate: null,
				usageLimit: 0,
				timesUsed: 0,
				isActive: true,
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<div>
			{/* Add coupons */}
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
										<h4>Add Coupons</h4>
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
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Coupon Name
														<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='text'
														className='form-control'
														{...register('couponName', {
															required: 'Coupon Name is Required!',
														})}
													/>
													{errors.couponName && (
														<span className='text-danger'>
															{errors.couponName.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Coupon Code
														<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='text'
														className='form-control'
														{...register('couponCode', {
															required: 'Coupon Code is Required!',
														})}
													/>
													{errors.couponCode && (
														<span className='text-danger'>
															{errors.couponCode.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Type<span className='text-danger ms-1'>*</span>
													</label>

													<Select
														classNamePrefix='react-select'
														options={price}
														placeholder='Choose Type'
														onChange={(selectedOption) => {
															setValue('discountType', selectedOption);
															trigger('discountType'); // optional: triggers validation
														}}
													/>
													{errors.discountType && (
														<span className='text-danger'>
															{errors.discountType.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Discount<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='number'
														className='form-control'
														{...register('discountValue', {
															required: 'Discount is Required!',
														})}
													/>
													{errors.discountValue && (
														<span className='text-danger'>
															{errors.discountValue.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Minimum Amount
														<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='number'
														className='form-control'
														{...register('minOrderAmount', {
															required: 'Minimum Amount is Required!',
														})}
													/>
													{errors.minOrderAmount && (
														<span className='text-danger'>
															{errors.minOrderAmount.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='mb-3'>
													<label className='form-label'>
														Times Used
														<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='number'
														className='form-control'
														{...register('timesUsed', {
															required: 'Times Used is Required!',
														})}
													/>
													{errors.timesUsed && (
														<span className='text-danger'>
															{errors.timesUsed.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-12'>
												<div className='mb-3'>
													<label className='form-label'>
														{' '}
														Limit<span className='text-danger ms-1'>*</span>
													</label>
													<input
														type='number'
														className='form-control'
														{...register('usageLimit', {
															required: 'Usage Limit is Required!',
														})}
													/>
													<span className='unlimited-text'>
														0 for Unlimited
													</span>
													{errors.usageLimit && (
														<span className='text-danger'>
															{errors.usageLimit.message}
														</span>
													)}
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>
														Start Date
														<span className='text-danger ms-1'>*</span>
													</label>
													<div className='input-groupicon calender-input'>
														<Calendar className='info-img' />
														<DatePicker
															value={selectedDate}
															onChange={handleDateChange}
															className='filterdatepicker'
															format='DD-MM-YYYY'
															placeholder='DD-MM-YYYY'
															allowClear={false}
														/>
													</div>
												</div>
											</div>
											<div className='col-lg-6'>
												<div className='input-blocks'>
													<label>
														End Date<span className='text-danger ms-1'>*</span>
													</label>
													<div className='input-groupicon calender-input'>
														<Calendar className='info-img' />
														<DatePicker
															value={selectedDate1}
															onChange={handleDateChange1}
															className='filterdatepicker'
															format='DD-MM-YYYY'
															placeholder='DD-MM-YYYY'
															allowClear={false}
														/>
													</div>
												</div>
											</div>
											{/* <div className="input-blocks">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center mb-2">
                          <span className="status-label">All Products</span>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              id="user4"
                              className="check"
                              defaultChecked={true}
                            />
                            <label
                              htmlFor="user4"
                              className="checktoggle mb-0 me-1"
                            />
                            <span className="customer-toggle">
                              Once Per Customer
                            </span>
                          </div>
                        </div>
                        <Select
                          classNamePrefix="react-select"
                          options={list}
                          placeholder="Choose"
                        />
                      </div> */}
											{/* <div className="mb-3 summer-description-box">
                        <label className="form-label">Description</label>
                        <TextEditor />
                        <p>Maximum 60 Words</p>
                      </div> */}

											<div className='input-blocks m-0'>
												<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
													<span className='status-label'>
														Status <span className='text-danger ms-1'>*</span>
													</span>
													<input
														type='checkbox'
														id='user3'
														className='check'
														defaultChecked='true'
														{...register('isActive', {
															required: 'Status is Required!',
														})}
													/>
													<label
														htmlFor='user3'
														className='checktoggle'
													>
														{' '}
													</label>
												</div>
											</div>
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
												Create Coupon
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Add Coupons */}
		</div>
	);
};

export default AddCoupons;
