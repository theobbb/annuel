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

<!-- <div class="mb-4">
	L’équipe de l’Annuel {page.params.year}
</div> -->
<div class="text-base- mb-4 border-b pb-2">L’équipe de l’Annuel ’{page.params.year?.slice(2)}</div>
<div id="equipe" class="grid-12- mb-8">
	<div class="text-base- grid grid-cols-4 gap-x-8 leading-6 whitespace-nowrap">
		{#each groups as { role, children }, i}
			{#each children as member}
				<div class="text-balance">
					{#if member.student}
						<a href="/{page.params.year}/finissant-es/{member.student}">{member.name}</a>
					{:else}
						{member.name}
					{/if}
					<span class="ml-2 inline-block text-muted">{role.name}</span>
				</div>
			{/each}
		{/each}
	</div>
</div>
