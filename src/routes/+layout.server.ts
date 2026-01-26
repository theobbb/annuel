import { pocketbase } from '$lib/pocketbase';
import type {
	ProgramsRecord,
	ProjectTagsRecord,
	SocialsRecord,
	YearsRecord
} from '$lib/pocketbase.types';

export async function load() {
	const [programs, socials, tags, years]: [
		ProgramsRecord[],
		SocialsRecord[],
		ProjectTagsRecord[],
		YearsRecord[]
	] = await Promise.all([
		pocketbase.collection('programs').getFullList<ProgramsRecord>({ sort: 'name' }),
		pocketbase.collection('socials').getFullList<SocialsRecord>({ sort: 'name' }),
		pocketbase.collection('project_tags').getFullList<ProjectTagsRecord>({ sort: '-name' }),
		pocketbase.collection('years').getFullList<YearsRecord>({ sort: '-id' })
	]);

	const tags_map: Map<string, ProjectTagsRecord> = new Map(tags.map((tag) => [tag.id, tag]));
	const programs_map: Map<string, ProgramsRecord> = new Map(
		programs.map((program) => [program.id, program])
	);

	const year = years[0].id;

	return { programs, programs_map, socials, tags, tags_map, years, year };
}
