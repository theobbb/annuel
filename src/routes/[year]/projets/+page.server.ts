import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import { pocketbase } from '$lib/pocketbase';
import { shuffle_array } from '$lib/utils/shuffle';

export type ProjectsRecordExpanded = ProjectsRecord & {
	expand: {
		students: StudentsRecord[];
	};
};

export async function load({ params, setHeaders }) {
	const projects: ProjectsRecordExpanded[] = await pocketbase.collection('projects').getFullList({
		filter: `year = "${params.year}"`,
		expand: 'students',
		fields:
			'files, id, name, students, expand.students.id, expand.students.first_name, expand.students.last_name, expand.students.program'
	});

	// setHeaders({ca})
	return { projects };
}
