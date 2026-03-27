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
		program_types
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
</script>

<div class="grid-12">
	<div class="col-span-6 col-start-4">
		<Title>Programmes</Title>
		<div class="mt-8 space-y-8">
			{#each groups as { type, children }}
				<div class="">
					<div class="col-span-4 py-0.5">
						<!-- <div class="col-span-3">
							{type.name}
						</div> -->
						<div class="">
							{#each children as { id, name, code, description }}
								<div class="col-span-4 gap-6 border-b px-6 py-4">
									<div class="mb-6 flex justify-between text-2xl">
										<div class="">{name}</div>
										<div>{code}</div>
									</div>
									<!-- <div class="text-base/5">
										{description}
									</div> -->
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
