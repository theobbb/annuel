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
		'rounded-md- left-48- pointer-events-none absolute top-11 -right-4 z-20 border bg-background ',
		i > hovered_i ? 'translate-x-4' : i < hovered_i ? '-translate-x-4' : '',
		i != hovered_i ? ' opacity-0' : '',
		'transition duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-[opacity,transform]'
	]}
>
	<div class={['flex flex-col gap-y-6 px-6 py-4 text-balance']}>
		<div class="flex items-center justify-between text-base font-[420]">
			<div class="text-ml-0.5 text-muted">
				{program_type?.name}
			</div>
			<div class="flex gap-8">
				<div>{stats?.project_count} <span class="ml-0.5 text-muted">projets</span></div>
				<div>{stats?.student_count} <span class="ml-0.5 text-muted">finissant.es</span></div>
			</div>
		</div>
		<div class="mt-8">
			<div class="border-b pb-2 text-2xl">{program.name}</div>
		</div>
		<div class="col-span-4 col-start-2 pb-1.5 text-base/5.5 font-[410] text-muted">
			{program.description}
		</div>

		<!-- <div class="col-span-full border-b-2"></div> -->
	</div>
</div>

<style>
</style>
