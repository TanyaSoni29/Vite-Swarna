/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye } from 'react-feather';
import { useSelector } from 'react-redux';
import Table from '../../../core/pagination/datatable';
import TooltipIcons from '../../common/tooltip-content/tooltipIcons';
import RefreshIcon from '../../common/tooltip-content/refresh';
import CollapesIcon from '../../common/tooltip-content/collapes';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import AddStores from './addStores';
import EditStores from './editStores';
import DeleteStoresModal from '../../common/modal/deleteStores';
import CommonFooter from '../../common/footer/commonFooter';
import { useDispatch } from 'react-redux';
import { refreshStores, setStore } from '../../redux/slices/storesSlice';

const StoreList = () => {
	const dispatch = useDispatch();
	const { stores } = useSelector((state) => state.store);

	console.log('stores list page ---', stores);

	const columns = [
		{
			title: 'Store Name',
			dataIndex: 'storeName',
			sorter: (a, b) => a.storeName.localeCompare(b.storeName),
		},

		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => a.email.localeCompare(b.email),
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
			title: 'Address',
			dataIndex: 'address',
			sorter: (a, b) => a.address.localeCompare(b.address),
			render: (text) => <div>{text ? text : '-'}</div>,
		},

		{
			title: 'City',
			dataIndex: 'city',
			sorter: (a, b) => a.city.localeCompare(b.city),
			render: (text) => <div>{text ? text : '-'}</div>,
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: () => (
				<span
					className={`badge  badge-success d-inline-flex align-items-center badge-xs`}
				>
					<i className='ti ti-point-filled me-1' />
					Active
				</span>
			),
			sorter: (a, b) => a.isActive.localeCompare(b.isActive),
		},
		{
			title: '',
			dataIndex: 'action',
			render: (_, store) => (
				<div className='action-table-data'>
					<div className='edit-delete-action'>
						<div className='input-block add-lists'></div>

						{/* <Link className="me-2 p-2" to="#">
              <Eye className="feather-view" />
            </Link> */}

						<Link
							className='me-2 p-2'
							to='#'
							data-bs-toggle='modal'
							data-bs-target='#edit-store'
							onClick={() => dispatch(setStore(store))}
						>
							<Edit className='feather-edit' />
						</Link>

						<Link
							data-bs-toggle='modal'
							data-bs-target='#delete-modal'
							className='p-2 d-flex align-items-center border rounded'
							to='#'
							onClick={() => dispatch(setStore(store))}
						>
							<i
								data-feather='trash-2'
								className='feather-trash-2'
							/>
						</Link>
					</div>
				</div>
			),
			sorter: (a, b) => a.createdby.length - b.createdby.length,
		},
	];

	useEffect(() => {
		dispatch(refreshStores());
	}, [dispatch]);

	return (
		<>
			<div className='page-wrapper'>
				<div className='content'>
					<div className='page-header'>
						<div className='add-item d-flex'>
							<div className='page-title'>
								<h4>Stores</h4>
								<h6>Manage your Store</h6>
							</div>
						</div>
						<ul className='table-top-head'>
							<TooltipIcons
								columns={columns}
								dataSource={stores}
							/>
							<RefreshIcon api={refreshStores} />
							<CollapesIcon />
						</ul>
						<div className='page-btn'>
							<Link
								to='#'
								data-bs-toggle='modal'
								data-bs-target='#add-store'
								className='btn btn-primary'
							>
								<PlusCircle
									data-feather='plus-circle'
									className=' me-2'
								/>
								Add Store
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
										Select Status
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
						<div className='card-body pb-0'>
							<div className=' table-responsive'>
								<Table
									columns={columns}
									dataSource={stores}
								/>
							</div>
						</div>
					</div>

					{/* /product list */}
				</div>
				<CommonFooter />
			</div>
			<>
				{/* Add Store */}
				<AddStores />
				{/* /Add Store */}
				{/* Edit Store */}
				<EditStores />
				{/* /Edit Store */}
			</>

			<DeleteStoresModal />
		</>
	);
};

export default StoreList;
