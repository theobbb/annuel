import { pocketbase } from '$lib/pocketbase';
import type {
	GlobalsRecord,
	ProgramsRecord,
	ProgramTypesRecord,
	SocialsRecord,
	YearsRecord
} from '$lib/pocketbase.types';

export async function load() {
	const [years, programs, program_types, socials, globals]: [
		YearsRecord[],
		ProgramsRecord[],
		ProgramTypesRecord[],
		SocialsRecord[],
		GlobalsRecord
	] = await Promise.all([
		pocketbase
			.collection('years')
			.getFullList<YearsRecord>({ sort: '-id', fields: 'id,poster,video' }),
		pocketbase
			.collection('programs')
			.getFullList<ProgramsRecord>({ sort: 'sort_order', fields: 'id,code,name,type,description' }),
		pocketbase
			.collection('program_types')
			.getFullList<ProgramTypesRecord>({ sort: 'sort_order', fields: 'id,name' }),
		pocketbase
			.collection('socials')
			.getFullList<SocialsRecord>({ sort: 'sort_order', fields: 'id,name,url' }),
		pocketbase
			.collection('globals')
			.getFirstListItem<GlobalsRecord>('', { fields: 'introduction,banner' })
	]);

	const program_map: Map<string, ProgramsRecord> = new Map(
		programs.map((program) => [program.id, program])
	);

	const seed = Math.random();

	return { programs, program_types, program_map, socials, globals, years, seed };
}
