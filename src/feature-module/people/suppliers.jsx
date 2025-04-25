/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'react-feather';
import { useSelector } from 'react-redux';
import Table from '../../core/pagination/datatable';
import SupplierModal from '../../core/modals/peoples/supplierModal';
import TooltipIcons from '../../core/common/tooltip-content/tooltipIcons';
import RefreshIcon from '../../core/common/tooltip-content/refresh';
import CollapesIcon from '../../core/common/tooltip-content/collapes';
import { useDispatch } from 'react-redux';
import { refreshSellers, setSeller } from '../../core/redux/slices/sellerSlice';

const Suppliers = () => {
	const dispatch = useDispatch();
	const { sellers } = useSelector((state) => state.seller);

	const columns = [
		{
			title: 'Id',
			dataIndex: 'sellerID',
			sorter: (a, b) => a.sellerID.length - b.sellerID.length,
		},
		{
			title: 'Business Name',
			dataIndex: 'businessName',
			render: (text) => (
				<span className='productimgname'>
					{/* <Link
						to='#'
						className='avatar avatar-md me-2'
					>
						<ImageWithBasePath
							alt=''
							src={record.image}
							className='img-fluid rounded-2'
						/>
					</Link> */}
					<Link to='#'>{text ? text : '-'}</Link>
				</span>
			),
			sorter: (a, b) => a.businessName.localeCompare(b.businessName),
		},
		{
			title: 'Owner',
			dataIndex: 'ownerName',
			sorter: (a, b) => a.ownerName.localeCompare(b.ownerName),
			render: (text) => <div>{text ? text : '-'}</div>,
		},

		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => a.email.length - b.email.length,
			render: (text) => <div>{text ? text : '-'}</div>,
		},

		{
			title: 'Phone',
			dataIndex: 'phoneNumber1',
			sorter: (a, b) => a.phoneNumber1.localeCompare(b.phoneNumber1),
			render: (text) => <div>{text ? text : '-'}</div>,
		},

		{
			title: 'Phone 2',
			dataIndex: 'phoneNumber2',
			sorter: (a, b) => a.phoneNumber2.localeCompare(b.phoneNumber2),
			render: (text) => <div>{text ? text : '-'}</div>,
		},

		{
			title: 'Country',
			dataIndex: 'country',
			sorter: (a, b) => a.country.length - b.country.length,
			render: (text) => <div>{text ? text : '-'}</div>,
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: (text) => (
				<>
					<span
						className={`badge  d-inline-flex align-items-center badge-xs ${
							text ? 'badge-success' : 'badge-danger'
						}`}
					>
						<i className='ti ti-point-filled me-1' />
						{text ? 'Active' : 'Inactive'}
					</span>
				</>
			),
			sorter: (a, b) => a.status.length - b.status.length,
		},
		{
			title: 'Premium',
			dataIndex: 'isPremium',
			render: (text) => (
				<>
					<span
						className={`badge  d-inline-flex align-items-center badge-xs ${
							text ? 'badge-success' : 'badge-danger'
						}`}
					>
						<i className='ti ti-point-filled me-1' />
						{text ? 'True' : 'False'}
					</span>
				</>
			),
			sorter: (a, b) => a.status.length - b.status.length,
		},

		{
			title: '',
			dataIndex: 'action',
			render: (_, seller) => (
				<div className='action-table-data'>
					<div className='edit-delete-action'>
						<div className='input-block add-lists'></div>

						{/* <Link
							className='me-2 p-2'
							to='#'
						>
							<Eye className='feather-view' />
						</Link> */}

						<Link
							className='me-2 p-2'
							to='#'
							data-bs-toggle='modal'
							data-bs-target='#edit-supplier'
							onClick={() => dispatch(setSeller(seller))}
						>
							<Edit className='feather-edit' />
						</Link>

						<Link
							className='confirm-text p-2'
							to='#'
							data-bs-toggle='modal'
							data-bs-target='#delete-modal'
							onClick={() => dispatch(setSeller(seller))}
						>
							<Trash2 className='feather-trash-2' />
						</Link>
					</div>
				</div>
			),
			sorter: (a, b) => a.createdby.length - b.createdby.length,
		},
	];

	useEffect(() => {
		dispatch(refreshSellers());
	}, [dispatch]);

	return (
		<>
			<div className='page-wrapper'>
				<div className='content'>
					<div className='page-header'>
						<div className='add-item d-flex'>
							<div className='page-title'>
								<h4>Sellers</h4>
								<h6>Manage your seller</h6>
							</div>
						</div>
						<ul className='table-top-head'>
							<TooltipIcons
								columns={columns}
								dataSource={sellers}
							/>
							<RefreshIcon api={refreshSellers} />
							<CollapesIcon />
						</ul>
						<div className='page-btn'>
							<Link
								to='#'
								className='btn btn-primary'
								data-bs-toggle='modal'
								data-bs-target='#add-supplier'
							>
								<i className='ti ti-circle-plus me-1'></i>
								Add Seller
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
										<li>
											<Link
												to='#'
												className='dropdown-item rounded-1'
											>
												New Joiners
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='card-body'>
							<div className='table-responsive'>
								<Table
									className='table datanew'
									columns={columns}
									dataSource={sellers}
									rowKey={(record) => record?.id}
								/>
							</div>
						</div>
					</div>
					{/* /product list */}
				</div>
			</div>
			<SupplierModal />
		</>
	);
};

export default Suppliers;
