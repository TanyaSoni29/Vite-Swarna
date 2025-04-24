/** @format */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { createCategories } from '../../redux/services/operations/categoriesApi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshCategories } from '../../redux/slices/categoriesSlice';

const AddCategoryList = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.category);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors, isSubmitSuccessful },
	} = useForm();

	const parentCategoryOptions = categories.map((category) => {
		return { value: category.categoryID, label: category.categoryName };
	});

	const onSubmit = async (data) => {
		console.log(data);
		try {
			const newData = {
				categoryName: data?.categoryName,
				parentCategoryID: data?.parentCategoryID?.value || null,
			};
			const response = await createCategories(newData);
			if (response.status === 'success') {
				dispatch(refreshCategories());
			} else {
				toast.error('Failed to create Category!');
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
				categoryName: '',
				parentCategoryID: null,
			});
		}
	}, [reset, isSubmitSuccessful]);

	return (
		<div>
			{/* Add Category */}
			{/* <div className="modal fade" id="add-category">
                <div className="modal-dialog modal-dialog-centered custom-modal-two">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>Create Category</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category Slug</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="mb-0">
                                            <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                                <span className="status-label">Status</span>
                                                <input
                                                    type="checkbox"
                                                    id="user2"
                                                    className="check"
                                                    defaultChecked="true"
                                                />
                                                <label htmlFor="user2" className="checktoggle" />
                                            </div>
                                        </div>
                                        <div className="modal-footer-btn">
                                            <button
                                                type="button"
                                                className="btn btn-cancel me-2"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                            <Link to="#" className="btn btn-submit">
                                                Create Category
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
			<div
				className='modal fade'
				id='add-category'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='page-wrapper-new p-0'>
							<div className='content'>
								<div className='modal-header'>
									<div className='page-title'>
										<h4>Add Category</h4>
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
											/>
										</div> */}
										{/* <div className='mb-0'>
											<div className='status-toggle modal-status d-flex justify-content-between align-items-center'>
												<span className='status-label'>
													Status<span className='text-danger ms-1'>*</span>
												</span>
												<input
													type='checkbox'
													id='user2'
													className='check'
													defaultChecked
												/>
												<label
													htmlFor='user2'
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
												Add Category
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* /Add Category */}
		</div>
	);
};

export default AddCategoryList;
