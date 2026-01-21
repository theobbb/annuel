import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord, YearsRecord } from '$lib/pocketbase.types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const student: StudentsRecord & { expand: { 'projects(student)': ProjectsRecord[] } } =
		await pocketbase.collection('students').getOne(params.student, { expand: 'projects(student)' });

	if (!student) error(404);
	return { student };
}
