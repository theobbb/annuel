<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord, ProgramTypesRecord } from '$lib/pocketbase.types';

	const programs: ProgramsRecord[] = $derived(page.data.programs);
	const program_types: ProgramTypesRecord[] = $derived(page.data.program_types);

	const groups: { type: ProgramTypesRecord; children: ProgramsRecord[] }[] = $derived.by(() => {
		return program_types.map((type) => ({
			type,
			children: programs.filter((program) => program.type === type.id)
		}));
	});
</script>

<div>
	<div class="mb-8">Tous les programmes</div>
	<div class="leading-10">
		{#each groups as { type, children }}
			<div class="grid-12 border-t-2 py-0.5">
				<div class="col-span-3">
					{type.name}
				</div>
				<div class="col-span-9">
					{#each children as program}
						<div class="flex justify-between gap-6">
							<div>{program.name}</div>
							<div class="">{program.code}</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
