/** @format */

import React from 'react';
import { image_path } from '../../environment';
import PropTypes from 'prop-types';

const ImageWithBasePath = (props) => {
	const altText = String(props.alt);
	const fullSrc = `${image_path}${props.src}`;

	return (
		<img
			className={props.className}
			src={fullSrc}
			height={props.height}
			width={props.width}
			alt={altText}
			id={props.id}
		/>
	);
};

ImageWithBasePath.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number,
	id: PropTypes.string,
};

export default ImageWithBasePath;
