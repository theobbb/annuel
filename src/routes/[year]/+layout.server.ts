import { error } from '@sveltejs/kit';
import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { ProgramStatsRecord } from '$lib/pocketbase.types';

export async function load({ parent, params }) {
	const { years } = await parent();
	const year = years.find((y) => y.id == params.year);
	if (!year) error(404);

	const [list_projects, list_students, program_stats_arr] = await Promise.all([
		pocketbase.collection('projects').getList<ProjectsRecord>(1, 0, {
			filter: `year = "${params.year}"`,
			requestKey: `projects-${params.year}`
		}),
		pocketbase.collection('students').getList<StudentsRecord>(1, 0, {
			filter: `year = "${params.year}"`,
			requestKey: `students-${params.year}`
		}),
		pocketbase.collection('program_stats').getFullList<ProgramStatsRecord>({
			filter: `year = "${params.year}"`,
			fields: 'program,student_count,project_count'
		})
	]);

	const n_projects = list_projects.totalItems;
	const n_students = list_students.totalItems;

	const program_stats: Map<string, ProgramStatsRecord> = new Map(
		program_stats_arr.map((record) => [record.program || '', record])
	);

	return { year, n_projects, n_students, program_stats };
}
