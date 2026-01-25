import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord, SocialsRecord, YearsRecord } from '$lib/pocketbase.types';

export async function load() {
	const [programs, socials, years]: [ProgramsRecord[], SocialsRecord[], YearsRecord[]] =
		await Promise.all([
			pocketbase.collection('programs').getFullList<ProgramsRecord>({ sort: 'name' }),
			pocketbase.collection('socials').getFullList<SocialsRecord>({ sort: 'name' }),
			pocketbase.collection('years').getFullList<YearsRecord>({ sort: '-id' })
		]);

	const year = years[0].id;

	return { programs, socials, years, year };
}
