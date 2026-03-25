import { pocketbase } from '$lib/pocketbase';
import type {
	MembersRecord,
	MemberRolesRecord,
	SponsorsRecord,
	ProgramStatsRecord
} from '$lib/pocketbase.types';

export async function load({ params }) {
	const [members, member_roles, sponsors, program_stats_arr]: [
		MembersRecord[],
		MemberRolesRecord[],
		SponsorsRecord[],
		ProgramStatsRecord[]
	] = await Promise.all([
		pocketbase.collection('members').getFullList<MembersRecord>({
			sort: 'name',
			filter: `year = "${params.year}"`,
			fields: 'id,name,role'
		}),
		pocketbase
			.collection('member_roles')
			.getFullList<MemberRolesRecord>({ sort: 'sort_order', fields: 'id,name' }),
		pocketbase
			.collection('sponsors')
			.getFullList<SponsorsRecord>({ sort: 'sort_order', fields: 'id,name,size,logo' }),
		pocketbase.collection('program_stats').getFullList<ProgramStatsRecord>({
			filter: `year = "${params.year}"`,
			fields: 'program,student_count,project_count'
		})
	]);

	const program_stats: Map<string, ProgramStatsRecord> = new Map(
		program_stats_arr.map((record) => [record.program || '', record])
	);
	return { members, member_roles, sponsors, program_stats };
}
