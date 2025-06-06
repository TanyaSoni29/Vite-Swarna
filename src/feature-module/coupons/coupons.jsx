/** @format */

import React, { useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../core/pagination/datatable';
import { setToogleHeader } from '../../core/redux/action';
import AddCoupons from '../../core/modals/coupons/addcoupons';
import EditCoupons from '../../core/modals/coupons/editcoupons';
import CommonFooter from '../../core/common/footer/commonFooter';
import {
	refreshCoupons,
	setCoupon,
} from '../../core/redux/slices/couponsSlice';
import DeleteCoupon from '../../core/common/modal/deleteCoupon';

const Coupons = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.rootReducer.toggle_header);
	const { coupons } = useSelector((state) => state.coupon);
	const dataSource = coupons;

	console.log('dataSource', dataSource);

	const columns = [
		{
			title: 'Coupon Code',
			dataIndex: 'couponCode',
			sorter: (a, b) => a.couponCode.toLocaleCompare(b.couponCode),
		},
		// {
		// 	title: 'Code',
		// 	dataIndex: 'Code',
		// 	render: (text) => <span className='badge purple-badge'>{text}</span>,
		// 	sorter: (a, b) => a.Code.length - b.Code.length,
		// },
		// {
		// 	title: 'Description',
		// 	dataIndex: 'Description',
		// 	sorter: (a, b) => a.Description.length - b.Description.length,
		// },
		{
			title: 'Type',
			dataIndex: 'discountType',
			sorter: (a, b) => a.discountType.toLocaleCompare(b.discountType),
		},
		{
			title: 'Discount',
			dataIndex: 'discountValue',
			sorter: (a, b) => a.discountValue.length - b.discountValue.length,
		},
		{
			title: 'Limit',
			dataIndex: 'usageLimit',
			sorter: (a, b) => a.usageLimit.length - b.usageLimit.length,
		},
		{
			title: 'Start',
			dataIndex: 'startDate',
			render: (text) => (
				<div>
					{text
						? new Date(text).toLocaleDateString('en-GB') +
						  ' ' +
						  text?.split('T')[1]?.slice(0, 5)
						: '-'}
				</div>
			),
			sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
		},
		{
			title: 'Valid',
			dataIndex: 'endDate',
			render: (text) => (
				<div>
					{text
						? new Date(text).toLocaleDateString('en-GB') +
						  ' ' +
						  text?.split('T')[1]?.slice(0, 5)
						: '-'}
				</div>
			),
			sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
		},

		{
			title: 'Status',
			dataIndex: 'isActive',
			render: (text) => (
				<span
					className={`badge table-badge ${
						text ? 'bg-success' : 'bg-danger'
					} fw-medium fs-10`}
				>
					{text ? 'Active' : 'Inactive'}
				</span>
			),
			sorter: (a, b) => a.isActive.length - b.isActive.length,
		},
		{
			title: '',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, coupon) => (
				<div className='action-table-data'>
					<div className='edit-delete-action'>
						<Link
							className='me-2 p-2'
							to='#'
							data-bs-toggle='modal'
							data-bs-target='#edit-units'
							onClick={() => dispatch(setCoupon(coupon))}
						>
							<i
								data-feather='edit'
								className='feather-edit'
							></i>
						</Link>
						<Link
							data-bs-toggle='modal'
							data-bs-target='#delete-modal'
							className='p-2'
							to='#'
							onClick={() => dispatch(setCoupon(coupon))}
						>
							<i
								data-feather='trash-2'
								className='feather-trash-2'
							></i>
						</Link>
					</div>
				</div>
			),
		},
	];

	const renderTooltip = (props) => (
		<Tooltip
			id='pdf-tooltip'
			{...props}
		>
			Pdf
		</Tooltip>
	);
	const renderExcelTooltip = (props) => (
		<Tooltip
			id='excel-tooltip'
			{...props}
		>
			Excel
		</Tooltip>
	);

	const renderRefreshTooltip = (props) => (
		<Tooltip
			id='refresh-tooltip'
			{...props}
		>
			Refresh
		</Tooltip>
	);
	const renderCollapseTooltip = (props) => (
		<Tooltip
			id='refresh-tooltip'
			{...props}
		>
			Collapse
		</Tooltip>
	);

	useEffect(() => {
		dispatch(refreshCoupons());
	}, [dispatch]);

	return (
		<div>
			<div className='page-wrapper'>
				<div className='content'>
					<div className='page-header'>
						<div className='add-item d-flex'>
							<div className='page-title'>
								<h4>Coupons</h4>
								<h6>Manage Your Coupons</h6>
							</div>
						</div>
						<ul className='table-top-head'>
							<li>
								<OverlayTrigger
									placement='top'
									overlay={renderTooltip}
								>
									<Link>
										<ImageWithBasePath
											src='assets/img/icons/pdf.svg'
											alt='img'
										/>
									</Link>
								</OverlayTrigger>
							</li>
							<li>
								<OverlayTrigger
									placement='top'
									overlay={renderExcelTooltip}
								>
									<Link
										data-bs-toggle='tooltip'
										data-bs-placement='top'
									>
										<ImageWithBasePath
											src='assets/img/icons/excel.svg'
											alt='img'
										/>
									</Link>
								</OverlayTrigger>
							</li>
							<li>
								<OverlayTrigger
									placement='top'
									overlay={renderRefreshTooltip}
								>
									<Link
										data-bs-toggle='tooltip'
										data-bs-placement='top'
										onClick={() => dispatch(refreshCoupons())}
									>
										<RotateCcw />
									</Link>
								</OverlayTrigger>
							</li>
							<li>
								<OverlayTrigger
									placement='top'
									overlay={renderCollapseTooltip}
								>
									<Link
										data-bs-toggle='tooltip'
										data-bs-placement='top'
										id='collapse-header'
										className={data ? 'active' : ''}
										onClick={() => {
											dispatch(setToogleHeader(!data));
										}}
									>
										<ChevronUp />
									</Link>
								</OverlayTrigger>
							</li>
						</ul>
						<div className='page-btn'>
							<Link
								to='#'
								className='btn btn-primary'
								data-bs-toggle='modal'
								data-bs-target='#add-units'
							>
								<i className='ti ti-circle-plus me-1'></i>
								Add Coupons
							</Link>
						</div>
					</div>
					{/* /product list */}
					<div className='card table-list-card'>
						<div className='card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3'>
							<div className='search-set'></div>
							<div className='d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3'>
								<div className='dropdown me-2'>
									<Link
										to='#'
										className='dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center'
										data-bs-toggle='dropdown'
									>
										Type
									</Link>
									<ul className='dropdown-menu  dropdown-menu-end p-3'>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Fixed
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Percentage
											</Link>
										</li>
									</ul>
								</div>
								<div className='dropdown me-2'>
									<Link
										to='#'
										className='dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center'
										data-bs-toggle='dropdown'
									>
										Status
									</Link>
									<ul className='dropdown-menu  dropdown-menu-end p-3'>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Active
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Inactive
											</Link>
										</li>
									</ul>
								</div>
								<div className='dropdown'>
									<Link
										to='#'
										className='dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center'
										data-bs-toggle='dropdown'
									>
										Sort By : Last 7 Days
									</Link>
									<ul className='dropdown-menu  dropdown-menu-end p-3'>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Recently Added
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Ascending
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Desending
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Last Month
											</Link>
										</li>
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												Last 7 Days
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='card-body'>
							<div className='table-responsive'>
								<Table
									columns={columns}
									dataSource={dataSource}
								/>
							</div>
						</div>
					</div>
					{/* /product list */}
				</div>
				<CommonFooter />
			</div>
			<AddCoupons />
			<EditCoupons />
			<DeleteCoupon />
		</div>
	);
};

export default Coupons;
