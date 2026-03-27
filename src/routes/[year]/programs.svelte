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
		<div class="grid-12 group items-center- relative border-b pt-2 pb-12 first:border-t">
			<a href="/{page.params.year}/projets?programme={id}" class="absolute inset-0"> </a>
			<div class="col-span-2 text-muted">{program_type_map.get(type)?.name}</div>

			<div class="col-span-6 text-3xl">{name}</div>

			<div class="col-span-3">
				<div class="flex flex-col">
					{#if stats}
						<a class="underline- block" href="/{page.params.year}/projets?programme={id}">
							Projets :
							{stats.project_count}
						</a>
						<a class=" underline-" href="/{page.params.year}/projets?finissant-e-s={id}">
							Finissant.e.s :
							{stats.student_count}
						</a>
					{/if}
				</div>
			</div>
			<div
				class="col-start-12 flex justify-end transition not-group-hover:translate-x-4 not-group-hover:opacity-0"
			>
				<div class=" icon-[ri--arrow-right-long-line] text-right text-4xl"></div>
			</div>
			<!-- <div class="text-base/5">
										{description}
									</div> -->
		</div>
	{/each}
</div>
