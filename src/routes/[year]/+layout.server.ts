import { pocketbase } from '$lib/pocketbase';

export async function load({ params }) {
	const year = params.year;

	const years = await pocketbase.collection('years').getFullList({ sort: '-id' });

	return { year, years };
}
