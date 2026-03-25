import { error } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { ListResult } from 'pocketbase';

export async function load({ parent, params }) {
	const { years } = await parent();
	const year = params.year;
	if (!years.find((y) => y.id == year)) error(404);

	console.log('load');
	const [list_projects, list_students]: [ListResult<ProjectsRecord>, ListResult<StudentsRecord>] =
		await Promise.all([
			pocketbase.collection('projects').getList<ProjectsRecord>(1, 0, {
				filter: `year = "${year}"`,
				requestKey: `projects-${year}`
			}),
			pocketbase.collection('students').getList<StudentsRecord>(1, 0, {
				filter: `year = "${year}"`,
				requestKey: `students-${year}`
			})
		]);

	const n_projects = list_projects.totalItems;
	const n_students = list_students.totalItems;

	return { year, n_projects, n_students };
}
