import { pocketbase } from '$lib/pocketbase';
import type {
	ProgramsRecord,
	ProjectsRecord,
	ProjectTagsRecord,
	StudentsRecord,
	YearsRecord
} from '$lib/pocketbase.types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const project: ProjectsRecord & {
		expand: {
			student: StudentsRecord & {
				expand: {
					program: ProgramsRecord;
					'projects(student)': ProjectsRecord[];
				};
			};
			tags: ProjectTagsRecord[];
		};
	} = await pocketbase
		.collection('projects')
		.getOne(params.project, { expand: 'tags,student,student.program,student.projects(student)' });

	if (!project) error(404);
	return { project };
}
