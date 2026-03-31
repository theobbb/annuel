import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

export type StudentsRecordExpanded = StudentsRecord & {
	expand: { 'projects(students)': ProjectsRecord[] };
};
export async function load({ params }) {
	const students: StudentsRecord[] = await pocketbase.collection('students').getFullList({
		filter: `year = "${params.year}"`,
		sort: 'last_name',
		fields: 'id,first_name,last_name,pronouns,program,headshot'
	});

	return { students };
}
