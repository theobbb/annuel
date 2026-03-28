<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { view }: { view: 'grille' | 'liste' } = $props();

	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];
</script>

<div class="flex items-center gap-2 lg:gap-3">
	{#each views as { name, param, icon }}
		<a
			class={[
				'-m-2 flex items-center justify-center gap-1.5 p-2 text-2xl',
				view == param ? '' : ' not-hover:text-black/40',
				'transition'
			]}
			href={url_query_param(page.url.href, { vue: param })}
		>
			<div class={[icon, 'translate-y-px']}></div>
			<!-- <div class="-mt-0.5">{name}</div> -->
		</a>
		<div class="text-muted last:hidden">/</div>
	{/each}
</div>
