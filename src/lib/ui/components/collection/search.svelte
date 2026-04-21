<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const is_searching = $derived(!!page.url.searchParams.get('search'));

	function on_search_input(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const value = event.currentTarget.value;
		const new_url = url_query_param(page.url.href, { search: value || null });
		goto(new_url, { replaceState: true, noScroll: true, keepFocus: true });
	}

	function on_reset() {
		// Clear the param by passing null to your utility
		const new_url = url_query_param(page.url.href, { search: null });
		goto(new_url, { replaceState: true, noScroll: true });
	}
</script>

<form
	class="relative flex items-center gap-3.5"
	onsubmit={(event) => {
		event.preventDefault();
		if (event.currentTarget instanceof HTMLFormElement) {
			(event.currentTarget.querySelector('#search') as HTMLElement)?.blur();
		}
	}}
>
	<button
		class={[
			'absolute- -left-7- -m-2 flex cursor-pointer items-center justify-center p-2 text-base transition hover:bg-black/10',
			is_searching ? '' : 'opacity-0',
			'ease transition duration-200'
		]}
		onclick={on_reset}
		title="Réinitialiser la recherche"
		type="button"
	>
		<div class="icon-[ri--reset-right-line]"></div>
	</button>

	<input
		type="text"
		placeholder="Rechercher…"
		oninput={on_search_input}
		name="search"
		id="search"
		autocomplete={null}
		value={page.url.searchParams.get('search') ?? ''}
		class="text-base- tracking-wide- w-full border px-2.5 py-0.5 pr-8 transition outline-none not-focus:border-transparent hover:bg-black/10 focus:placeholder-black/60"
	/>
	<div class="pointer-events-none absolute top-2 right-2 icon-[ri--search-line]"></div>
</form>
