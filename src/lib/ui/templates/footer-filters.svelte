<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { n_items } = $props();

	const url_search_view: 'grille' | 'liste' = $derived(
		page.url.searchParams.get('vue') == 'liste' ? 'liste' : 'grille'
	);
	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];
</script>

<div class="sticky bottom-0 z-200 bg-background">
	<div class="">
		<div class="grid-12 items-center border-t-2 py-3.5 text-xl">
			<div class="col-span-3">
				<div class="flex items-center gap-1">
					{#each views as { name, param, icon }}
						<a
							class={[
								'flex items-center gap-1.5 px-3 py-1',
								url_search_view == param ? 'bg-black text-white' : ''
							]}
							href={url_query_param(page.url.href, 'vue', param)}
						>
							<div class={[icon]}></div>
							<div class="-mt-0.5">{name}</div>
						</a>
					{/each}
				</div>
			</div>
			<div class="col-span-7">Rechercher</div>
			<div class="col-span-2 text-right">{n_items} projets</div>
		</div>
	</div>
</div>
