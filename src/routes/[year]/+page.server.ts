import { pocketbase } from '$lib/pocketbase';
import type { MembersRecord, MemberRolesRecord, SponsorsRecord } from '$lib/pocketbase.types';

export async function load({ params }) {
	const [members, member_roles, sponsors, students] = await Promise.all([
		pocketbase.collection('members').getFullList<MembersRecord>({
			sort: 'name',
			filter: `year = "${params.year}"`,
			expand: 'student',
			fields: 'id,name,role,expand'
		}),
		pocketbase
			.collection('member_roles')
			.getFullList<MemberRolesRecord>({ sort: 'sort_order', fields: 'id,name' }),
		pocketbase
			.collection('sponsors')
			.getFullList<SponsorsRecord>({ sort: 'sort_order', fields: 'id,name,size,logo,url' }),
		pocketbase.collection('students').getFullList<SponsorsRecord>({
			sort: 'last_name',
			filter: `year = "${params.year}"`,
			fields: 'headshot,id'
		})
	]);

	return { members, member_roles, sponsors, students };
}
