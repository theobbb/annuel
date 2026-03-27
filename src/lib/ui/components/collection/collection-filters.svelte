<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import { url_query_param } from '$lib/utils/url';

	const { view }: { view: 'grille' | 'liste' } = $props();

	const views = [
		{ name: 'Grille', param: 'grille', icon: 'icon-[ri--layout-grid-line]' },
		{ name: 'Liste', param: 'liste', icon: 'icon-[ri--list-check]' }
	];

	function on_search_input(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const value = event.currentTarget.value;
		const new_url = url_query_param(page.url.href, { search: value || null });
		goto(new_url, { replaceState: true, noScroll: true, keepFocus: true });
	}
</script>

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
		oninput={on_search_input}
		name="search"
		id="search"
		autocomplete={null}
		value={page.url.searchParams.get('search') ?? ''}
		class=" w-full bg-background-2 px-2.5 py-1 text-lg transition outline-none hover:bg-black/10 focus:placeholder-black/60"
	/>
</div>
