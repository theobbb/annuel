<script lang="ts">
	import { page } from '$app/state';
	import type {
		ProgramsRecord,
		ProgramStatsRecord,
		ProgramTypesRecord
	} from '$lib/pocketbase.types';

	const { i, hovered_i, program }: { i: number; hovered_i: number; program: ProgramsRecord } =
		$props();

	const stats: ProgramStatsRecord = $derived(page.data.program_stats?.get(program.id));

	const program_type: ProgramTypesRecord = $derived(
		page.data.program_types.find((p_type: ProgramTypesRecord) => p_type.id == program.type)
	);
</script>

<div
	class={[
		'pointer-events-none absolute top-11 -right-4 -left-4 z-20 rounded  bg-dark-background text-dark-foreground',
		i > hovered_i ? 'translate-x-4-' : i < hovered_i ? '-translate-x-4-' : '',
		i != hovered_i ? ' opacity-0' : '',
		'transition duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-[opacity,transform]'
	]}
>
	<div class="flex flex-col gap-y-6! px-8 py-6 text-balance">
		<div class="flex items-center justify-between text-base font-medium">
			<div class="text-white/50">
				{program_type?.name}
			</div>
			<div class="flex gap-8">
				<div>{stats?.project_count} <span class="ml-0.5 text-white/50">projets</span></div>
				<div>{stats?.student_count} <span class="ml-0.5 text-white/50">finissant.es</span></div>
			</div>
		</div>
		<div class="mt-24">
			<div class="text-3xl">{program.name}</div>
		</div>
		<div class="col-span-4 col-start-2 max-w-4/5 pb-1 text-lg/6.5">{program.description}</div>

		<!-- <div class="col-span-full border-b-2"></div> -->
	</div>
</div>

<style>
</style>
