<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { MemberRolesRecord, MembersRecord } from '$lib/pocketbase.types';

	const members: MembersRecord[] = $derived(page.data.members);
	const member_roles: MemberRolesRecord[] = $derived(page.data.member_roles);

	const groups: { role: MemberRolesRecord; children: MembersRecord[] }[] = $derived.by(() => {
		return member_roles.map((role) => ({
			role,
			children: members.filter((program) => program.role === role.id)
		}));
	});
</script>

<div class="border-b-2 pb-3">Équipe de l’Annuel</div>
<div class="grid-12 mb-8">
	<div class="relative col-span-2 col-start-4 mt-8">
		<div class="sticky top-8">
			<Facecard />
		</div>
	</div>
	<div class="col-span-7 leading-8">
		{#each groups as { role, children }, i}
			<div
				class={[
					'flex justify-between gap-3 border-b-2 py-0.5',
					i == groups.length - 1 && 'border-b-0!'
				]}
			>
				<div class="">
					{#each children as program}
						<div class="py-1 pb-1.5 text-balance">{program.name}</div>
					{/each}
				</div>
				<div class="py-1 pb-1.5">{role.name}</div>
			</div>
		{/each}
		<div class="mt-56 mb-16 text-xl/6">
			Merci à toutes les personnes qui ont contribué <br /> de près ou de loin à ce projet, par leur
			regard,<br /> leurs idées et leur présence.
		</div>
	</div>
</div>
