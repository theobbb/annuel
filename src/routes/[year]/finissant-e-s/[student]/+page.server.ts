import { browser } from '$app/environment';
import { pocketbase } from '$lib/pocketbase';
import type {
	ProgramsRecord,
	ProjectsRecord,
	StudentsRecord,
	YearsRecord
} from '$lib/pocketbase.types';
import { load_student, use_store_students } from '$lib/store/store-preview-student.svelte';
import { error } from '@sveltejs/kit';

// export async function load({ params }) {
// 	const student = await load_student(params.student);

// 	if (browser) {
// 		const store = use_store_students();
// 	}

// 	if (!student) error(404);
// 	return { student };
// }

export async function load({ params, fetch }) {
	const student: StudentsRecord & {
		expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
	} = await pocketbase
		.collection('students')
		.getOne(params.student, { expand: 'program,projects(student)' });

	// const res = await fetch('/api/students/' + params.student);

	// const student: StudentsRecord & {
	// 	expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
	// } = await res.json();
	if (!student) error(404);
	return { student };
}
