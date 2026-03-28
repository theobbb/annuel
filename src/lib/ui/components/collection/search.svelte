<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	function on_search_input(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const value = event.currentTarget.value;
		const new_url = url_query_param(page.url.href, { search: value || null });
		goto(new_url, { replaceState: true, noScroll: true, keepFocus: true });
	}
</script>

<div class="text-base- flex items-center gap-8">
	<input
		type="text"
		placeholder="Rechercher"
		oninput={on_search_input}
		name="search"
		id="search"
		autocomplete={null}
		value={page.url.searchParams.get('search') ?? ''}
		class="w-full border bg-background-2 px-3.5 py-1 text-lg transition outline-none not-focus:border-transparent hover:bg-black/10 focus:placeholder-black/60"
	/>
</div>
