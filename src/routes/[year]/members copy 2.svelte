<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { MemberRolesRecord, MembersRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const members: MembersRecord[] = $derived(page.data.members);
	const member_roles: MemberRolesRecord[] = $derived(page.data.member_roles);

	const groups: { role: MemberRolesRecord; children: MembersRecord[] }[] = $derived.by(() => {
		return member_roles.map((role) => ({
			role,
			children: members.filter((program) => program.role === role.id)
		}));
	});
</script>

<!-- <Title>Équipe de l’Annuel</Title> -->

<div class="text-4xl">Équipe de l’Annuel</div>
<div id="equipe" class="mb-24">
	<div
		class="flex- flex-wrap justify-center gap-x-2 text-center text-3xl leading-8 whitespace-nowrap"
	>
		{#each groups as { role, children }, i}
			{#each children as member}
				<div class="text-balance">
					{member.name}<span class="ml-2 inline-block text-muted">({role.name})</span>
				</div>
			{/each}
		{/each}
	</div>
</div>
