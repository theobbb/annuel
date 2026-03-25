<script lang="ts">
	import { page } from '$app/state';
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import { url_query_param } from '$lib/utils/url';

	const { view, n_items }: { view: 'grille' | 'liste'; n_items: number } = $props();

	const seed = use_seed();
	const project_collection = $derived(page.route.id?.split('/')[2] == 'projets');

	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];
</script>

<div class="sticky bottom-0 z-20 bg-background">
	<div class="">
		<div class="grid-12 items-center border-t-2 py-3.5 text-xl">
			<div class="col-span-3">
				<div class="flex items-center gap-1">
					{#each views as { name, param, icon }}
						<a
							class={['flex items-center gap-1.5 px-2 py-1', view == param ? 'ring-2' : '']}
							href={url_query_param(page.url.href, { vue: param })}
						>
							<div class={[icon]}></div>
							<div class="-mt-0.5">{name}</div>
						</a>
					{/each}
					{#if project_collection}
						<button class="ml-8 flex items-center" title="Mélanger" onclick={() => seed.shuffle()}>
							<div class="icon-[ri--shuffle-line]"></div>
						</button>
					{/if}
				</div>
			</div>
			<div class="col-span-7">Rechercher</div>
			<div class="col-span-2 text-right">{n_items} projets</div>
		</div>
	</div>
</div>
