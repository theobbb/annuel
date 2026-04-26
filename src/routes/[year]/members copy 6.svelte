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

	$inspect(members);
</script>

<!-- <Title>Équipe de l’Annuel</Title> -->
<div class="mb-gap">Équipe de l’Annuel <sup>{members.length}</sup></div>
<div class="grid-10 mb-8">
	<div class="relative col-span-2 mt-2">
		<div class="sticky top-18">
			<!-- <Facecard /> -->
		</div>
	</div>
	<div class="col-span-5 col-start-6 leading-relaxed">
		{#each groups as { role, children }, i}
			<div
				class={[
					'flex justify-between gap-3 border-b py-0.5',
					i == groups.length - 1 && 'border-b-0!'
				]}
			>
				<div class="text-balance">
					{#each children as member}
						{#if member?.expand?.student?.id}
							<a
								href="/{page.params.year}/finissant-es/{member?.expand?.student?.id}"
								class="block"
							>
								{member.name}
							</a>
						{:else}
							<div>
								{member.name}
							</div>
						{/if}
					{/each}
				</div>
				<div class="">{role.name}</div>
			</div>
		{/each}
		<div class="mt-32 leading-tight">
			Merci à toutes les personnes qui ont contribué <br /> de près ou de loin à ce projet, par leur
			regard,<br /> leurs idées et leur présence.
		</div>
	</div>
</div>
