/** @format */

import { DatePicker } from 'antd';
import { Calendar } from 'feather-icons-react/build/IconComponents';
import { useEffect, useState } from 'react';
import Select from 'react-select';
// import TextEditor from '../../../feature-module/inventory/texteditor';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { refreshCoupons } from '../../redux/slices/couponsSlice';
import { updateCoupons } from '../../redux/services/operations/couponsApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const EditCoupons = () => {
	const dispatch = useDispatch();
	const { coupon } = useSelector((state) => state.coupon);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const price = [
		{ value: 'choose', label: 'Choose Type' },
		{ value: 'fixed', label: 'Fixed' },
		{ value: 'percentage', label: 'Percentage' },
	];
	// const options = [
	// 	{ value: 'nike-jordan', label: 'Nike Jordan' },
	// 	{ value: 'amazon-echo-dot', label: 'Amazon Echo Dot' },
	// ];

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedDate1, setSelectedDate1] = useState(null);

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
			const response = await updateCoupons(coupon?.id, newData);
			if (response.status === 'success') {
				dispatch(refreshCoupons());
			} else {
				toast.error('Failed to update Coupons!');
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
		if (coupon) {
			const matchedOption = price.find(
				(option) => option.value === coupon?.discountType
			);
			setValue('couponCode', coupon?.couponCode || '');
			setValue('couponName', coupon?.couponName || '');
			setValue('discountType', matchedOption || null);
			setValue('discountValue', coupon?.discountValue || 0);
			setValue('minOrderAmount', coupon?.minOrderAmount || 0);
			setValue('usageLimit', coupon?.usageLimit || 0);
			setValue('timesUsed', coupon?.timesUsed || 0);
			setValue('isActive', coupon?.isActive ?? true);

			// Safely parse start and end dates
			if (coupon?.startDate && !isNaN(new Date(coupon.startDate))) {
				setSelectedDate(dayjs(coupon.startDate));
			}
			if (coupon?.endDate && !isNaN(new Date(coupon.endDate))) {
				setSelectedDate1(dayjs(coupon.endDate));
			}
		}
	}, [coupon, setValue]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({
				couponCode: '',
				discountType: '',
				discountValue: 0,
				minOrderAmount: 0,
				usageLimit: 0,
				timesUsed: 0,
				isActive: true,
			});
			setSelectedDate(dayjs(new Date())); // Reset start date to today
			setSelectedDate1(dayjs(new Date())); // Reset end date to today
		}
	}, [reset, isSubmitSuccessful]);

	console.log({ coupon, selectedDate, selectedDate1 });

	return (
		<div>
			{/* Edit coupons */}
			<div
				className='modal fade'
				id='edit-units'
			>
				<div className='modal-dialog modal-dialog-centered custom-modal-two'>
					<div className='modal-content'>
						<div className='page-wrapper-new p-0'>
							<div className='content'>
								<div className='modal-header border-0 custom-modal-header'>
									<div className='page-title'>
										<h4>Edit Coupons</h4>
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
															{errors?.couponCode.message}
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
														value={watch('discountType')}
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
													{errors?.discountValue && (
														<span className='text-danger'>
															{errors?.discountValue}
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
											{/* <div className='input-blocks'>
												<div className='status-toggle modal-status d-flex justify-content-between align-items-center mb-2'>
													<span className='status-label'>All Products</span>
													<div className='d-flex align-items-center'>
														<input
															type='checkbox'
															id='user5'
															className='check'
														/>
														<label
															htmlFor='user5'
															className='checktoggle mb-0 me-1'
														/>
														<span className='customer-toggle'>
															Once Per Customer
														</span>
													</div>
												</div>

												<Select
													classNamePrefix='react-select'
													options={options}
													placeholder='Select an option'
													isSearchable={true} // Set to false if you don't want a search input
												/>
											</div> */}
											{/* <div className='mb-3 summer-description-box'>
												<label className='form-label'>Description</label>
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
														id='user6'
														className='check'
														defaultChecked='true'
														{...register('isActive', {
															required: 'Status is Required!',
														})}
													/>
													{errors.isActive && (
														<span className='text-danger'>
															{errors.isActive.message}
														</span>
													)}
													<label
														htmlFor='user6'
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
			{/* /Edit Coupons */}
		</div>
	);
};

export default EditCoupons;
