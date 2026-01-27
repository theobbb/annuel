<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const url_search_view = $derived(page.url.searchParams.get('vue') || '');
</script>

{#snippet view(option: string, active: boolean, icon: string)}
	<div
		class={[
			'flex items-center gap-1 px-2 py-px',
			active ? 'bg-white ' : 'text-2 bg-black/5 group-hover:underline'
		]}
	>
		<!-- <span class={icon}></span> -->
		{option}
	</div>
{/snippet}

<div class="flex justify-end">
	<div>
		<a
			class="border- no-hover group border- hover:ring- flex w-fit border-transparent p-0.5"
			href={url_query_param(page.url.href, 'vue', url_search_view == 'liste' ? 'grille' : 'liste')}
		>
			{@render view('Grille', url_search_view != 'liste', 'icon-[material-symbols--grid-3x3]')}
			{@render view('Liste', url_search_view == 'liste', 'icon-[material-symbols--lists]')}
		</a>
	</div>
</div>
