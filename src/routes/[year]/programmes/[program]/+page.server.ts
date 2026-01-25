import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord } from '$lib/pocketbase.types';
import type { ProjectsRecord, StudentsRecord, YearsRecord } from '$lib/pocketbase.types';
import type { StudentsRecordExpanded } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const program: ProgramsRecord = await pocketbase.collection('programs').getOne(params.program);

	if (!program) error(404);

	const students: StudentsRecordExpanded[] = await pocketbase.collection('students').getFullList({
		filter: `year = "${params.year}" && program = "${params.program}"`,
		sort: 'last_name',
		expand: 'program,projects(student)'
	});

	return { students, program };
}
