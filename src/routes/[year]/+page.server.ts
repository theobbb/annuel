import { pocketbase } from '$lib/pocketbase';
import type { MembersRecord, MemberRolesRecord, SponsorsRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const [sponsors]: [SponsorsRecord[]] = await Promise.all([
		pocketbase
			.collection('sponsors')
			.getFullList<SponsorsRecord>({ sort: 'sort_order', fields: 'id,name,size,logo' })
	]);

	return { sponsors };
}
