import { error } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { ListResult } from 'pocketbase';

export async function load({ parent, params }) {
	const { years } = await parent();
	const year = years.find((y) => y.id == params.year);
	if (!year) error(404);

	const [list_projects, list_students]: [ListResult<ProjectsRecord>, ListResult<StudentsRecord>] =
		await Promise.all([
			pocketbase.collection('projects').getList<ProjectsRecord>(1, 0, {
				filter: `year = "${params.year}"`,
				requestKey: `projects-${params.year}`
			}),
			pocketbase.collection('students').getList<StudentsRecord>(1, 0, {
				filter: `year = "${params.year}"`,
				requestKey: `students-${params.year}`
			})
		]);

	const n_projects = list_projects.totalItems;
	const n_students = list_students.totalItems;

	console.log(n_projects);

	return { year, n_projects, n_students };
}
