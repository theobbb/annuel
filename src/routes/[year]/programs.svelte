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
<div class="mt-8">
	{#each programs as { id, name, code, description, type }}
		{@const stats = program_stats.get(id)}
		<div
			class="grid-12 group items-center- relative border-b pt-2 pb-12 transition first:border-t hover:bg-accent"
		>
			<a
				class="peer absolute inset-0"
				href="/{page.params.year}/projets?programme={id}"
				aria-label="Programme {name}"
			>
			</a>
			<div class="col-span-8 text-muted transition max-lg:text-base lg:col-span-2">
				{program_type_map.get(type)?.name}
			</div>

			<div class="col-span-10 text-2xl max-lg:font-[430] lg:col-span-6 lg:text-3xl">
				<div class="relative w-fit">
					{name}
					<div class="absolute -right-3 bottom-0 flex translate-x-full justify-end">
						<div
							class="icon-[ri--arrow-right-long-line] text-right text-3xl transition not-group-hover:-translate-x-4 not-group-hover:opacity-0"
						></div>
					</div>
				</div>
			</div>

			<!-- <div class="col-span-2">{code}</div> -->
			<div class="col-span-6 text-right max-lg:col-start-3 lg:col-span-2">
				<div class="flex flex-col">
					{#if stats}
						<a class="relative z-10 block w-fit" href="/{page.params.year}/projets?programme={id}">
							Projets
							<sup>{stats.project_count}</sup>
						</a>
						<a
							class="relative z-10 block w-fit"
							href="/{page.params.year}/finissant-e-s?programme={id}"
						>
							Finissant.e.s
							<sup>{stats.student_count}</sup>
						</a>
					{/if}
				</div>
			</div>
			<div
				class="col-span-4 text-right transition max-lg:col-start-10 max-lg:row-start-1 max-lg:text-base lg:col-span-2"
			>
				{code}
			</div>

			<!-- <div
				class="col-start-12 flex justify-end transition not-peer-hover:translate-x-4 not-peer-hover:opacity-0"
			>
				<div class=" icon-[ri--arrow-right-long-line] text-right text-2xl"></div>
			</div> -->
		</div>
	{/each}
</div>
