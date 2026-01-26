import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { PaginationResult } from '$lib/types';
import type { RecordListOptions } from 'pocketbase';

export async function get_chunk(year: string, page: number, program: string, tag: string) {
	const options: RecordListOptions = { filter: `year = "${year}"`, expand: 'students' };

	if (program) options.filter += ` && students.program = "${program}"`;
	if (tag) options.filter += ` && tags ~ "${tag}"`;

	const pagination: PaginationResult<ProjectsRecord & { expand: { students: StudentsRecord[] } }> =
		await pocketbase.collection('projects').getList(page, 72, options);

	return pagination;
}

// export async function get_list<T>(
// 	{ locals: { pocketbase }, depends, url }: ServerLoadEvent,
// 	collection: keyof CollectionRecords,
// 	args?: { options?: RecordListOptions; search_key?: keyof T }
// ) {
// 	depends(`data:${collection}`);

// 	const { options = {}, search_key = '' } = args || {};

// 	const sort = url.searchParams.get('sort');
// 	if (sort) options.sort = sort;

// 	const search = url.searchParams.get('search');
// 	if (search && search_key) options.filter = `${String(search_key)} ~ '${search}'`;

// 	const page = Number(url.searchParams.get('sort')) || 1;

// 	const res: PaginationResult<T> = await pocketbase
// 		.collection(collection)
// 		.getList(page, 64, options);

// 	return res;
// }
