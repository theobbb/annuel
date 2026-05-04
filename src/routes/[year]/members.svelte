<script lang="ts">
	import { page } from '$app/state';
	import type { MemberRolesRecord, MembersRecord, StudentsRecord } from '$lib/pocketbase.types';

	type MembersRecordExpanded = MembersRecord & {
		expand: {
			student?: StudentsRecord;
		};
	};
	const members: MembersRecordExpanded[] = $derived(page.data.members);
	const member_roles: MemberRolesRecord[] = $derived(page.data.member_roles);

	const groups: { role: MemberRolesRecord; children: MembersRecordExpanded[] }[] = $derived.by(
		() => {
			return member_roles
				.map((role) => ({
					role,
					children: members.filter((program) => program.role === role.id)
				}))
				.filter((g) => g.children.length);
		}
	);
</script>

<div id="equipe" class="text-base- border-b- mb-gap scroll-mt-32 pb-2">
	L’équipe de l’Annuel <sup>{members.length}</sup>
</div>
<div class="mb-8">
	<div class="gap-x-gap **:leading-tight! sm:columns-2 lg:columns-3">
		{#each groups as { role, children }, i}
			<div class="inline-block w-full *:py-1">
				<h2 class="mb-2- border-b text-muted">{role.name}</h2>

				{#each children as member}
					<h2 class="border-b text-balance">
						{#if member?.expand?.student?.id}
							<a
								href="/{page.params.year}/finissant-es/{member?.expand?.student?.id}"
								class="group no-hover relative block"
							>
								{member.name}
								<div
									class="pointer-events-none absolute top-0 right-6 bottom-0 flex translate-x-full translate-y-px items-center justify-end"
								>
									<div
										class="ease icon-[ri--arrow-right-long-line] -translate-y-px text-right text-2xl transition duration-200 not-group-hover:-translate-x-4 not-group-hover:opacity-0"
									></div>
								</div>
							</a>
						{:else}
							<div>
								{member.name}
							</div>
						{/if}
					</h2>
				{/each}
				<h2><div class="invisible" aria-hidden="true">*</div></h2>
			</div>
		{/each}
	</div>
</div>

<div class="border-b- mt-24 pb-12 text-center leading-tight">
	Merci à toutes les personnes qui ont contribué <br /> de près ou de loin à ce projet, par leur
	regard,<br /> leurs idées et leur présence.
</div>
