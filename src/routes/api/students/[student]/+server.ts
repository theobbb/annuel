import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord } from '$lib/pocketbase.types';
import type { ProgramsRecord } from '$lib/pocketbase.types';
import type { StudentsRecord } from '$lib/pocketbase.types';
import { json } from '@sveltejs/kit';

export async function GET({ params, setHeaders }) {
	const student: StudentsRecord & {
		expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
	} = await pocketbase
		.collection('students')
		.getOne(params.student, { expand: 'program,projects(student)' });

	setHeaders({
		'cache-control': '5000'
	});
	return json(student);
}
