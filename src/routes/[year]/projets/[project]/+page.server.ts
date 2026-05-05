import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import { error } from '@sveltejs/kit';

export type ProjectsRecordExpanded = ProjectsRecord & {
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
};

export async function load({ params, locals }) {
	const project: ProjectsRecordExpanded = await pocketbase
		.collection('projects')
		.getOne(params.project, {
			filter: `year = "${params.year}"`,
			expand: 'students, students.projects(students).students',
			fields:
				'id,name,description,students,background,foreground_white,thumbnail,files,meta_files,expand,teacher,session,class'
		});

	if (!project) error(404);
	if (project.background) locals.background = project.background;
	locals.foreground_white = Boolean(project.foreground_white);

	const next_random = await pocketbase
		.collection('projects')
		.getFirstListItem(`draft = false && id != "${params.project}" && year = "${params.year}"`, {
			sort: '@random',
			fields: 'id'
		});

	return { project, next_random_id: next_random?.id };
}
