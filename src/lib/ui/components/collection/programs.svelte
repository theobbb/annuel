<script lang="ts">
	import { page } from '$app/state';

	const { program_map } = $derived(page.data);

	const current_program = $derived(program_map.get(page.url.searchParams.get('programme') || ''));
</script>

<div class="flex items-center gap-4">
	<a
		class={[
			'-m-2 flex items-center gap-1 p-2 whitespace-nowrap  transition group-hover:border-current'
		]}
		href="/{page.params.year}/programmes?from={encodeURIComponent(page.url.href)}"
	>
		[{#if current_program}
			{current_program.name}
		{:else}
			Tous les programmes
		{/if}]
		<!-- <div class="icon-[ri--expand-up-down-line]"></div> -->
	</a>

	<a href="">
		[{page.params.year}]
	</a>
</div>
