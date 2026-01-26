import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';

import { error } from '@sveltejs/kit';

export type Student = StudentsRecord & {
	expand: {
		'projects(students)': (ProjectsRecord & {
			expand: {
				students: StudentsRecord[];
			};
		})[];
	};
};

export async function load({ params }) {
	const student: Student = await pocketbase
		.collection('students')
		.getOne(params.student, { expand: 'projects(students).students' });

	if (!student) error(404);
	return { student };
}
