<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { MemberRolesRecord, MembersRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const members: MembersRecord[] = $derived(page.data.members);
	const member_roles: MemberRolesRecord[] = $derived(page.data.member_roles);

	const groups: { role: MemberRolesRecord; children: MembersRecord[] }[] = $derived.by(() => {
		return member_roles
			.map((role) => ({
				role,
				children: members.filter((program) => program.role === role.id)
			}))
			.filter((g) => g.children.length);
	});
</script>

<div class="text-base- border-b- mb-gap pb-2">L’équipe de l’Annuel <sup>{members.length}</sup></div>
<div id="equipe" class="mb-8">
	<div class="leading-relaxed- columns-3 gap-x-gap **:leading-relaxed!">
		{#each groups as { role, children }, i}
			<div class="break-inside-avoid- inline-block w-full">
				<h2 class="mb-2- border-b text-muted">{role.name}</h2>

				{#each children as member}
					<h2 class="border-b text-balance">
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
						<!-- <span class="ml-2 inline-block text-muted">{role.name}</span> -->
					</h2>
				{/each}
				<h2 class="invisible" aria-hidden="true">*</h2>
			</div>
		{/each}
	</div>
</div>

<div class="mt-64 mb-32 text-center leading-tight">
	Merci à toutes les personnes qui ont contribué <br /> de près ou de loin à ce projet, par leur
	regard,<br /> leurs idées et leur présence.
</div>
