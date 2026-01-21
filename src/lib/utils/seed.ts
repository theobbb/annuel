export function string_to_1_8(str: string) {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // convert to 32-bit integer
	}

	return (Math.abs(hash) % 8) + 1;
}
