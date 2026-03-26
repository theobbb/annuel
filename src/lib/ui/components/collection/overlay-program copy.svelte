<script lang="ts">
	import type { ProgramsRecord } from '$lib/pocketbase.types';

	const { visible, program }: { visible: boolean; program: ProgramsRecord | null } = $props();
</script>

<!-- <div
	class={[
		'mix-blend-difference- pointer-events-none fixed top-0 right-0 left-0 z-20 h-20 bg-background',
		visible ? '' : '-translate-y-2 opacity-0',
		'transition duration-200 ease-in-out'
	]}
></div> -->

<div
	class={[
		'pointer-events-none absolute top-20 right-0 left-0 z-20',
		visible ? '' : '-translate-y-2 opacity-0',
		'transition duration-200 ease-in-out'
	]}
>
	{#if program}
		<div
			class="grid-12 min-h-[50svh]- grid-rows-[1fr_auto] items-end gap-y-6! bg-black px-8 py-8 pt-16 text-balance text-background"
		>
			<div class="col-span-4">
				<div class="text-4xl">{program.name}</div>
			</div>
			<div class="col-span-4 col-start-7">{program.description}</div>
			<div class="col-span-full border-b-2"></div>
		</div>
	{/if}
</div>
