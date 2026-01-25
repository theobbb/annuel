import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord } from '$lib/pocketbase.types';
import type { ProjectsRecord, StudentsRecord, YearsRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const students: (StudentsRecord & {
		expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
	})[] = await pocketbase.collection('students').getFullList({
		filter: `year = "${params.year}"`,
		sort: 'last_name',
		expand: 'program,projects(student)'
	});

	return { students };
}
