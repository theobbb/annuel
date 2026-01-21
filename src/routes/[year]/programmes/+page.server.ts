import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord } from '$lib/pocketbase.types';

export async function load() {
	const programs: ProgramsRecord[] = await pocketbase.collection('programs').getFullList();

	return { programs };
}
