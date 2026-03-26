<script lang="ts">
	import { page } from '$app/state';
	import type {
		ProgramsRecord,
		ProgramStatsRecord,
		ProgramTypesRecord
	} from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const {
		programs,
		program_types,
		program_stats
	}: {
		programs: ProgramsRecord[];
		program_types: ProgramTypesRecord[];
		program_stats: Map<string, ProgramStatsRecord>;
	} = $props();
	// const programs: ProgramsRecord[] = $derived(page.data.programs);
	// const program_types: ProgramTypesRecord[] = $derived(page.data.program_types);

	const groups: { type: ProgramTypesRecord; children: ProgramsRecord[] }[] = $derived.by(() => {
		return program_types?.map((type) => ({
			type,
			children: programs.filter((program) => program.type === type.id)
		}));
	});
	$inspect(page.data);
</script>

<div>
	<!-- <Title>Programmes</Title> -->

	<div class="mt-12 leading-10">
		{#each groups as { type, children }}
			<div class="border-t-2 py-0.5 first:border-t-0">
				<Title>{type.name}</Title>

				<div class="ml-24">
					{#each children as { id, name, code }}
						{@const stats = program_stats.get(id)}
						<a
							href="/{page.params.year}/projets?programme={id}"
							class="items-center- border-b-2- grid-12 justify-between gap-8 py-4 last:border-b-0"
						>
							<div class="col-span-5 text-4xl">{name}</div>

							<div class="text-xl- col-span-2">
								{#if stats}
									<div>{stats.project_count} projets</div>
									<div>{stats.student_count} finissant.e.s</div>
								{/if}
							</div>

							<div class="col-span-2 text-right">{code}</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
