import { pocketbase } from '$lib/pocketbase';
import type { ProjectTagsRecord } from '$lib/pocketbase.types';
import { get_chunk } from './data';

export async function load({ params, url }) {
	const program = url.searchParams.get('programme') || '';
	const tag = url.searchParams.get('categorie') || '';
	const pagination = await get_chunk(params.year, 1, program, tag);

	const tags: ProjectTagsRecord[] = await pocketbase
		.collection('project_tags')
		.getFullList({ sort: 'name' });

	return { pagination, tags };
}
