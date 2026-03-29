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

<div class="grid-12 mb-8">
	<div class="leading-8- col-span-3">
		{#each groups as { role, children }, i}
			<div class={['flex justify-between gap-3', i == groups.length - 1 && 'border-b-0!']}>
				<div class="">
					{#each children as member}
						<div class="text-balance">{member.name}</div>
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
