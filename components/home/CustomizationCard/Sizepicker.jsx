// BottleSizeSelector.js

import React, { useState } from 'react';

const BottleSizeSelector = () => {
	const [selectedSize, setSelectedSize] = useState('500ml');

	const handleSizeChange = (event) => {
		setSelectedSize(event.target.value);
	};

	return (
		<div className="bottle-size-selector d-flex g-1 mt-4">
			<label className={selectedSize === '500ml' ? 'active me-2' : 'me-2'}>
				<input
					type="radio"
					value="500ml"
					checked={selectedSize === '500ml'}
					onChange={handleSizeChange}

				/>
				<p>500ml</p>
			</label>

			<label className={selectedSize === '1liter' ? 'active' : ''}>
				<input
					type="radio"
					value="1liter"
					checked={selectedSize === '1liter'}
					onChange={handleSizeChange}

				/>
				<p>1L</p>
			</label>


		</div>
	);
};

export default BottleSizeSelector;
