import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';
import { get_chunk } from './data';

export async function load({ params }) {
	const pagination = await get_chunk(params.year, 1);

	return { pagination };
	// const pagination: PaginationResult<ProjectsRecord & { expand: { student: StudentsRecord } }> =
	// 	await pocketbase
	// 		.collection('projects')
	// 		.getList(1, 64, { filter: `student.year = "${params.year}"`, expand: 'student' });

	// return { pagination };
}
