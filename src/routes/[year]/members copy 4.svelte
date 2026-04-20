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

<!-- <div class="mb-4 text-4xl font-[400]">
	L’équipe de l’Annuel {page.params.year}
</div> -->
<div class="icon-[game-icons--paper-clip] text-8xl"></div>
<!-- <div class="text-base- mb-4 border-b pb-2">Équipe de l’Annuel ’{page.params.year?.slice(2)}</div> -->
<div id="equipe" class="bg- mb-24">
	<div class="justify-center- font-[320]- gap-x-2 text-xl/6.5 tracking-[-1%] whitespace-nowrap">
		{#each groups as { role, children }, i}
			{#each children as member}
				<div class="text-balance">
					{member.name}<span class="ml-2 inline-block text-muted">{role.name}</span>
				</div>
			{/each}
		{/each}
	</div>
</div>
