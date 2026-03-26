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

{#if project_collection}
	<button
		class="fixed right-4 bottom-4 z-50 flex items-center rounded-full border bg-background p-2 text-2xl shadow"
		title="Mélanger"
		onclick={() => seed.shuffle()}
	>
		<div class="icon-[ri--shuffle-line]"></div>
	</button>
{/if}

<div class="flex items-center gap-8 text-base">
	<div class="col-span-3 col-start-10">
		<div class="flex items-center justify-end gap-0.5">
			{#each views as { name, param, icon }}
				<a
					class={[
						'flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-2xl',
						view == param ? 'border-current' : 'border-transparent not-hover:text-black/40',
						'transition'
					]}
					href={url_query_param(page.url.href, { vue: param })}
				>
					<div class={[icon, 'translate-y-px']}></div>
					<!-- <div class="-mt-0.5">{name}</div> -->
				</a>
			{/each}
		</div>
	</div>
	<input
		type="text"
		placeholder="Rechercher"
		class="border- focus:ring- focus:bg-black/5!- w-full bg-black/5 px-2.5 py-1 text-lg ring-black transition outline-none hover:bg-black/10 focus:placeholder-black/60"
	/>
</div>
