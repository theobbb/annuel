import { pocketbase } from '$lib/pocketbase';
import type { ProjectFilesRecord, ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
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
		'project_files(project)': ProjectFilesRecord[];
	};
};

export async function load({ params, locals }) {
	const project: ProjectsRecordExpanded = await pocketbase
		.collection('projects')
		.getOne(params.project, {
			expand: 'students, project_files(project), students.projects(students).students',
			fields: 'id,name,description,students,background,foreground_white,thumbnail,expand'
		});

	if (!project) error(404);
	if (project.background) locals.background = project.background;
	return { project };
}
