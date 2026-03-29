<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { view }: { view: 'grille' | 'liste' } = $props();

	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];
</script>

<div class="flex items-center gap-2 lg:gap-2">
	{#each views as { name, param, icon }}
		<a
			class={[
				'text-lg- -m-2 flex items-center justify-center gap-1.5 p-2',
				view == param ? '' : ' not-hover:text-black/40',
				'transition'
			]}
			href={url_query_param(page.url.href, { vue: param })}
		>
			<div>{name}</div>
			<!-- <div class="-mt-0.5">{name}</div> -->
		</a>
		<div class="text-muted last:hidden">/</div>
	{/each}
</div>
