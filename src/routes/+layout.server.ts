import { pocketbase } from '$lib/pocketbase';
import type {
	GlobalsRecord,
	ProgramsRecord,
	ProgramTypesRecord,
	SocialsRecord,
	YearsRecord
} from '$lib/pocketbase.types';

export async function load() {
	const [years, programs, program_types, socials, globals] = await Promise.all([
		pocketbase
			.collection('years')
			.getFullList<YearsRecord>({ sort: '-id', fields: 'id,poster,video,accent_color' }),
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
	const program_type_map: Map<string, ProgramTypesRecord> = new Map(
		program_types.map((record) => [record.id, record])
	);

	const seed = Math.random();

	return { programs, program_types, program_type_map, program_map, socials, globals, years, seed };
}
