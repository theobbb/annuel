import { pocketbase } from '$lib/pocketbase';
import type {
	ProgramsRecord,
	ProgramTypesRecord,
	SocialsRecord,
	YearsRecord
} from '$lib/pocketbase.types';

export async function load() {
	const [years, programs, program_types, socials]: [
		YearsRecord[],
		ProgramsRecord[],
		ProgramTypesRecord[],
		SocialsRecord[]
	] = await Promise.all([
		pocketbase.collection('years').getFullList<YearsRecord>({ sort: '-id' }),
		pocketbase.collection('programs').getFullList<ProgramsRecord>({ sort: 'sort_order' }),
		pocketbase.collection('program_types').getFullList<ProgramTypesRecord>({ sort: 'sort_order' }),
		pocketbase.collection('socials').getFullList<SocialsRecord>({ sort: 'name' })
	]);

	const program_map: Map<string, ProgramsRecord> = new Map(
		programs.map((program) => [program.id, program])
	);

	const year = years[0].id;

	return { programs, program_types, program_map, socials, years, year };
}
