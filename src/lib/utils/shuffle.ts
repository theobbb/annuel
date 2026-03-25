// export function shuffle_array<T>(array: T[], seed: number): T[] {
// 	console.log('shuffling with seed: ', seed);
// 	for (let i = array.length - 1; i > 0; i--) {
// 		const j = Math.floor(seed * (i + 1));
// 		[array[i], array[j]] = [array[j], array[i]];
// 	}
// 	return array;
// }

export function shuffle_array<T>(array: T[], seed: number): T[] {
	// 1. Create a shallow copy so we don't mutate the original derived array
	console.log('shuffling with seed: ', seed);
	const result = [...array];

	// 2. Convert the float seed (0 to 1) into an integer seed for the PRNG
	let s = Math.floor(seed * 2147483647) || 1;

	// 3. Simple Pseudo-Random Number Generator (PRNG)
	const random = () => {
		s = (s * 16807) % 2147483647;
		return (s - 1) / 2147483646; // Returns a float between 0 and 1
	};

	// 4. Proper Fisher-Yates using the PRNG
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}
