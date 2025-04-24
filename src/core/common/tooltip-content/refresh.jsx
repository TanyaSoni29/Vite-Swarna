/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/* eslint-disable no-dupe-keys */
/* eslint-disable no-const-assign */
import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
const RefreshIcon = ({ api }) => {
	const dispatch = useDispatch();
	return (
		<li>
			<Tooltip title='Refresh'>
				<Link
					to='#'
					onClick={() => dispatch(api())}
				>
					<i className='ti ti-refresh'></i>
				</Link>
			</Tooltip>
		</li>
	);
};

export default RefreshIcon;
