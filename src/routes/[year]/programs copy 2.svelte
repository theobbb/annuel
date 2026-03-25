<script lang="ts">
	import { page } from '$app/state';
	import type {
		ProgramsRecord,
		ProgramStatsRecord,
		ProgramTypesRecord
	} from '$lib/pocketbase.types';

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
	<div class="mb-8">Tous les programmes</div>
	<div class="leading-10">
		{#each groups as { type, children }}
			<div class="grid-12 border-t-2 py-0.5">
				<div class="col-span-3">
					<div class="pt-2">{type.name}</div>
				</div>
				<div class="col-span-9">
					{#each children as { id, name, code }}
						{@const stats = program_stats.get(id)}
						<div class="first:border-t-2- border-b-2- flex justify-between gap-6 last:border-b-0">
							<div class="">{name}</div>
							<div class="">{code}</div>
							{#if stats}
								<div class="text-xl">
									<div>{stats.project_count} projets</div>
									<div>{stats.student_count} finissant.e.s</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
