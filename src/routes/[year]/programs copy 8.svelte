<script lang="ts">
	import { page } from '$app/state';
	import type {
		ProgramsRecord,
		ProgramStatsRecord,
		ProgramTypesRecord
	} from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const { programs, program_types, program_type_map, program_stats } = $derived(page.data);

	// const programs: ProgramsRecord[] = $derived(page.data.programs);
	// const program_types: ProgramTypesRecord[] = $derived(page.data.program_types);

	// const groups: { type: ProgramTypesRecord; children: ProgramsRecord[] }[] = $derived.by(() => {
	// 	return program_types?.map((type) => ({
	// 		type,
	// 		children: programs.filter((program) => program.type === type.id)
	// 	}));
	// });
</script>

<!-- <Title>Programmes</Title> -->
<div class="space-y-8- mt-8">
	{#each programs as { id, name, code, description, type }}
		{@const stats = program_stats.get(id)}
		<a
			class="grid-12 items-center- border-b pt-2 pb-12 first:border-t"
			href="/{page.params.year}/projets?programme={id}"
		>
			<div class="col-span-2 text-muted">{program_type_map.get(type)?.name}</div>

			<div class="col-span-6 text-3xl">{name}</div>

			<div class="col-span-3">
				<div class="">
					{#if stats}
						<div class="">
							<span class="inline-block min-w-32 text-muted">projets</span>
							<span class="font-[450]">{stats.project_count}</span>
						</div>

						<div>
							<span class="inline-block min-w-32 text-muted">finissant.e.s</span>
							<div class="inline-block min-w-8 font-[450]">{stats.student_count}</div>
						</div>
					{/if}
				</div>
			</div>
			<!-- <div class="text-base/5">
										{description}
									</div> -->
		</a>
	{/each}
</div>
