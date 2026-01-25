import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord, ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const student: StudentsRecord & {
		expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
	} = await pocketbase
		.collection('students')
		.getOne(params.student, { expand: 'program,projects(student)' });

	if (!student) error(404);
	return { student };
}
