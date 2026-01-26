import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project: ProjectsRecord & {
		expand: {
			students: (StudentsRecord & {
				expand: {
					'projects(students)': (ProjectsRecord & {
						expand: {
							students: StudentsRecord[];
						};
					})[];
				};
			})[];
		};
	} = await pocketbase
		.collection('projects')
		.getOne(params.project, { expand: 'students,students.projects(students).students' });

	if (!project) error(404);
	return { project };
}
