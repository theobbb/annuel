<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { url_query_param } from '$lib/utils/url';

	const {
		query_param = 'search',
		client_override
	}: {
		query_param?: string;
		client_override?: { on_search: (value: string) => void; on_reset: () => void };
	} = $props();

	let value: string = $state(page.url.searchParams.get(query_param) || '');

	async function onsubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		if (client_override) return client_override.on_search(value);
		//event.currentTarget.reset()

		const url = url_query_param(page.url.href, query_param, value);
		goto(url);
	}

	function reset() {
		value = '';

		if (client_override) return client_override.on_reset();

		const url = url_query_param(page.url.href, query_param, null);
		goto(url);
	}
</script>

<form class="group relative flex w-full gap-0.5" {onsubmit} autocomplete="off">
	<input
		class={['bg-background-2 peer', value ? 'w-full! lg:pr-54!' : 'focus:w-full! lg:w-64!']}
		name="search"
		placeholder="Rechercher..."
		bind:value
	/>
	<div
		class={[
			value ? '' : 'invisible group-focus-within:visible',
			'pointer-events-none inset-0 flex items-center justify-end gap-0.5 px-1.5 pr-1 max-lg:hidden '
		]}
	>
		<div class="pointer-events-auto">
			<button type="submit">Rechercher</button>
		</div>

		<div class="pointer-events-auto">
			<button onclick={reset} class="icon-[ri--reset-right-line] p-1"> </button>
		</div>
	</div>
</form>
