<script lang="ts">
	import { page } from '$app/state';

	const { program_map } = $derived(page.data);

	const current_program = $derived(program_map.get(page.url.searchParams.get('programme') || ''));
</script>

<div class="flex flex-col-reverse items-end gap-2 md:flex-row md:items-center md:gap-gap">
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
	</a>

	<a href="/archives?from={encodeURIComponent(page.url.href)}">
		[{page.params.year}]
	</a>
</div>
