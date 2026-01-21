import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord } from '$lib/pocketbase.types';
import type { ProjectsRecord, StudentsRecord, YearsRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const students: StudentsRecord[] = await pocketbase
		.collection('students')
		.getFullList({ filter: `year = "${params.year}"`, sort: 'last_name' });

	const programs: ProgramsRecord[] = await pocketbase
		.collection('programs')
		.getFullList({ sort: '-created' });

	return { students, programs };
}
