// ColorPicker.js

import React, { useState } from 'react';

const ColorPicker = () => {
	const [selectedColor, setSelectedColor] = useState('#ff0000');

	const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

	const handleColorChange = (color) => {
		setSelectedColor(color);
		// You can add logic here to change the product image based on the selected color
		// For now, let's just log the selected color
		console.log('Selected color:', color);
	};

	return (
		<div className="color-picker d-flex g-1">
			{colors.map((color, index) => (
				<div
					key={index}
					className="color-circle"
				>
					<button
						style={{ backgroundColor: color }}
						onClick={() => handleColorChange(color)}
					></button></div>
			))}
			<div className="selected-color" style={{ backgroundColor: selectedColor }}></div>
		</div>
	);
};

export default ColorPicker;
