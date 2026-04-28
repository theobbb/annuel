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
	const student: StudentsRecord = await pocketbase.collection('students').getOne(params.student);

	if (!student) error(404);

	const projects: (ProjectsRecord & { expand: { students: StudentsRecord[] } })[] = await pocketbase
		.collection('projects')
		.getFullList({
			filter: `students ~ "${params.student}" && draft = false`,
			expand: 'students'
		});

	// 1. Normalize sort_projects into an array regardless of input type
	let sortArray: string[] = [];

	if (Array.isArray(student.sort_projects)) {
		sortArray = student.sort_projects;
	} else if (typeof student.sort_projects === 'string' && student.sort_projects.trim() !== '') {
		// Handle comma-separated string: "id1,id2,id3" -> ["id1", "id2", "id3"]
		sortArray = student.sort_projects.split(',').map((id) => id.trim());
	}

	// 2. Only proceed if we have a valid list to sort by
	if (sortArray.length > 0) {
		const sortMap = new Map(sortArray.map((id, index) => [id, index]));

		projects.sort((a, b) => {
			// Unspecified items get -1 to appear first
			const aIdx = sortMap.has(a.id) ? sortMap.get(a.id)! : -1;
			const bIdx = sortMap.has(b.id) ? sortMap.get(b.id)! : -1;

			return aIdx - bIdx;
		});
	}

	return { student, projects };
}
