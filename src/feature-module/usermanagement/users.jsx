/** @format */

import React, { useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { ChevronUp, RotateCcw } from 'feather-icons-react/build/IconComponents';
import { setToogleHeader } from '../../core/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../core/pagination/datatable';
import AddUsers from '../../core/modals/usermanagement/addusers';
import EditUser from '../../core/modals/usermanagement/edituser';
import { refreshUsers, setUser } from '../../core/redux/slices/userSlice';
import DeleteUserModal from '../../core/common/modal/deleteUser';
import TooltipIcons from '../../core/common/tooltip-content/tooltipIcons';


const Users = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.rootReducer.toggle_header);
	const { users } = useSelector((state) => state.user);

	const renderPrinterTooltip = (props) => (
		<Tooltip
			id='printer-tooltip'
			{...props}
		>
			Printer
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

	const columns = [
		{
			title: 'User Name',
			dataIndex: 'userName',
			render: (text) => (
				<span className='userimgname'>
					<Link
						to='#'
						className='userslist-img bg-img'
					>
						{/* <ImageWithBasePath
							alt=''
							src={record?.profilePicture}
						/> */}
					</Link>
					<div>
						<Link to='#'>{text}</Link>
					</div>
				</span>
			),
			sorter: (a, b) => a.username.toLocaleCompare(b.username),
		},

		{
			title: 'Phone',
			dataIndex: 'phoneNumber',
			sorter: (a, b) => a.phoneNumber.toLocaleCompare(b.phoneNumber),
			render: (text) => <span className=''>{text ? text : '-'}</span>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			render: (text) => <span className=''>{text ? text : '-'}</span>,
			sorter: (a, b) => a.email.toLocaleCompare(b.email),
		},
		// {
		// 	title: 'Role',
		// 	dataIndex: 'role',
		// 	sorter: (a, b) => a.role.length - b.role.length,
		// },
		// {
		// 	title: 'Created On',
		// 	dataIndex: 'createdon',
		// 	sorter: (a, b) => a.createdon.length - b.createdon.length,
		// },
		{
			title: 'Status',
			dataIndex: 'isActive',
			render: (text) => (
				<div>
					{text && (
						<span className='d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-success fs-10'>
							{' '}
							<i className='ti ti-point-filled me-1 fs-11'></i>
							Active
						</span>
					)}
					{!text && (
						<span className='d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-danger fs-10'>
							{' '}
							<i className='ti ti-point-filled me-1 fs-11'></i>
							Inactive
						</span>
					)}
				</div>
			),
			sorter: (a, b) => a.status.length - b.status.length,
		},
		{
			title: '',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, user) => (
				<div className='action-table-data'>
					<div className='edit-delete-action'>
						{/* <Link
							className='me-2 p-2'
							to='#'
						>
							<i
								data-feather='eye'
								className='feather feather-eye action-eye'
							></i>
						</Link> */}
						<Link
							className='me-2 p-2'
							to='#'
							data-bs-toggle='modal'
							data-bs-target='#edit-units'
							onClick={() => dispatch(setUser(user))}
						>
							<i
								data-feather='edit'
								className='feather-edit'
							></i>
						</Link>
						<Link
							className='confirm-text p-2'
							to='#'
							onClick={() => dispatch(setUser(user))}
						>
							<i
								data-feather='trash-2'
								className='feather-trash-2'
								data-bs-toggle='modal'
								data-bs-target='#delete-modal'
							></i>
						</Link>
					</div>
				</div>
			),
		},
	];

	useEffect(() => {
		dispatch(refreshUsers());
	}, [dispatch]);

	return (
		<div>
			<div className='page-wrapper'>
				<div className='content'>
					<div className='page-header'>
						<div className='add-item d-flex'>
							<div className='page-title'>
								<h4>User List</h4>
								<h6>Manage Your Users</h6>
							</div>
						</div>
						<ul className='table-top-head'>
							<TooltipIcons
								columns={columns}
								dataSource={users}
							/>
							{/* <li>
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
							</li> */}
							<li>
								<OverlayTrigger
									placement='top'
									overlay={renderPrinterTooltip}
								>
									<Link
										data-bs-toggle='tooltip'
										data-bs-placement='top'
									>
										<i
											data-feather='printer'
											className='feather-printer'
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
										onClick={() => dispatch(refreshUsers())}
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
								className='btn btn-added'
								data-bs-toggle='modal'
								data-bs-target='#add-units'
							>
								<i className='ti ti-circle-plus me-1'></i>
								Add New User
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
									</ul>
								</div>
							</div>
						</div>

						<div className='card-body'>
							<div className='table-responsive'>
								<Table
									columns={columns}
									dataSource={users}
								/>
							</div>
						</div>
					</div>
					{/* /product list */}
				</div>
			</div>
			<AddUsers />
			<EditUser />
			<DeleteUserModal />
		</div>
	);
};

export default Users;
