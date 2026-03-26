<script lang="ts">
	import { page } from '$app/state';
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import { url_query_param } from '$lib/utils/url';

	const { view }: { view: 'grille' | 'liste' } = $props();

	const seed = use_seed();
	const project_collection = $derived(page.route.id?.split('/')[2] == 'projets');

	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];
</script>

<div class="flex items-center gap-8 py-3.5 text-base">
	<input
		type="text"
		placeholder="Rechercher"
		class="w-full border px-2.5 py-1 text-base ring-black outline-none focus:placeholder-black/60 focus:ring"
	/>
	<div class="col-span-7"></div>
	<div class="col-span-3 col-start-10">
		<div class="flex items-center justify-end gap-1">
			{#if project_collection}
				<button class="mr-8 flex items-center" title="Mélanger" onclick={() => seed.shuffle()}>
					<div class="icon-[ri--shuffle-line]"></div>
				</button>
			{/if}
			{#each views as { name, param, icon }}
				<a
					class={['flex items-center gap-1.5 px-2 py-1', view == param ? 'black-' : '']}
					href={url_query_param(page.url.href, { vue: param })}
				>
					<div class={[icon]}></div>
					<div class="-mt-0.5">{name}</div>
				</a>
			{/each}
		</div>
	</div>
</div>
