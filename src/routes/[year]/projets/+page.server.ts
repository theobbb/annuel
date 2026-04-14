import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import { pocketbase } from '$lib/pocketbase';
import { shuffle_array } from '$lib/utils/shuffle';

export type ProjectsRecordExpanded = ProjectsRecord & {
	expand: {
		students: StudentsRecord[];
	};
};

export async function load({ params }) {
	const projects: ProjectsRecordExpanded[] = await pocketbase.collection('projects').getFullList({
		filter: `year = "${params.year}" && draft = false`,
		expand: 'students',
		fields:
			'files, id, name, thumbnail, files, students, expand.students.id, expand.students.first_name, expand.students.last_name, expand.students.program, collectionId',
		requestKey: `projects-${params.year}`
	});
	// console.log('loading projects');

	// setHeaders({ca})
	return { projects };
}
