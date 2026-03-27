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
		<div class="grid-12 items-center border-b py-5 first:border-t">
			<div class="col-span-2 text-muted">{program_type_map.get(type)?.name}</div>
			<div class="col-span-5 text-3xl">{name}</div>
			<div class="text-right- col-span-2">{code}</div>
			<div class="col-span-3 flex gap-8">
				{#if stats}
					<div>Projets <sup>{stats.project_count}</sup></div>
					<div>Finissant.e.s <sup>{stats.student_count}</sup></div>
				{/if}
			</div>
			<!-- <div class="text-base/5">
										{description}
									</div> -->
		</div>
	{/each}
</div>
