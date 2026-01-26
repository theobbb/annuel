export function string_to_1_8(str: string) {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // convert to 32-bit integer
	}

	return (Math.abs(hash) % 8) + 1;
}

export function seed_placeholder_color(str: string, index: number) {
	let hash = 0;

	// Standard Java-style string hashing (same as your provided logic)
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}

	// 1. Generate a stable Hue (0 - 360)
	const hue = Math.abs(hash) % 360;

	// 2. Adjust Saturation based on the index (range: 40% - 90%)
	// This ensures that image 1 looks different from image 8
	const saturation = 40 + ((index * 7) % 51);

	// 3. Adjust Lightness (range: 45% - 65%)
	// Keeping it in the middle prevents colors from being too dark or white
	const lightness = 45 + ((index * 3) % 21);

	return `background: hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
