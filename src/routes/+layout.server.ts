import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord, SocialsRecord } from '$lib/pocketbase.types';

export async function load() {
	const programs: ProgramsRecord[] = await pocketbase
		.collection('programs')
		.getFullList({ sort: 'name' });

	const socials: SocialsRecord[] = await pocketbase
		.collection('socials')
		.getFullList({ sort: 'name' });

	return { programs, socials };
}
