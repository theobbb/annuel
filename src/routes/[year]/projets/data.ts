import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';

export async function get_chunk(year: string, page: number) {
	const pagination: PaginationResult<ProjectsRecord & { expand: { student: StudentsRecord } }> =
		await pocketbase
			.collection('projects')
			.getList(page, 72, { filter: `student.year = "${year}"`, expand: 'student' });

	return pagination;
}
