<script lang="ts">
	import { page } from '$app/state';
	import Facecard from '$lib/components/face-card.svelte';
	import type { MemberRolesRecord, MembersRecord } from '$lib/pocketbase.types';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const members: MembersRecord[] = $derived(page.data.members);
	const member_roles: MemberRolesRecord[] = $derived(page.data.member_roles);

	const groups: { role: MemberRolesRecord; children: MembersRecord[] }[] = $derived.by(() => {
		return member_roles.map((role) => ({
			role,
			children: members.filter((program) => program.role === role.id)
		}));
	});

	const cols = $derived.by(() => {
		const col_1: typeof groups = [];
		const col_2: typeof groups = [];

		// Calculate total children to find the target midpoint
		const totalChildren = groups.reduce((sum, g) => sum + g.children.length, 0);
		const target = totalChildren / 2;

		let currentCount = 0;

		for (const group of groups) {
			// If adding this group to col_1 keeps us close to or just over the half-way mark,
			// or if col_1 is still significantly smaller than the target.
			if (currentCount < target) {
				col_1.push(group);
				currentCount += group.children.length;
			} else {
				col_2.push(group);
			}
		}

		return [col_1, col_2];
	});

	let hovered: StudentsRecord | null = $state(null);
</script>

<!-- <Title>Équipe de l’Annuel</Title> -->
<div class="mb-gap">Équipe de l’Annuel <sup>{members.length}</sup></div>

<div class="grid grid-cols-10 gap-x-gap gap-y-16 leading-relaxed">
	<div class="col-span-8 col-start-1 grid grid-cols-8 gap-x-gap gap-y-16 leading-relaxed">
		{#each groups as { role, children }}
			<div class="col-span-4">
				<div class="mb-3">
					<div>{role.name}</div>
				</div>
				{#each children as member, i}
					<div class="">
						<h2 class="col-span-10 flex gap-0.5 leading-snug! lg:col-span-3">
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
						</h2>
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<!-- <div class="relative col-span-2 col-start-9 row-start-1 max-sm:hidden">
		<div class="sticky top-8">
			{#if hovered}
				<Facecard student={hovered} />
			{/if}
		</div>
	</div> -->
</div>
