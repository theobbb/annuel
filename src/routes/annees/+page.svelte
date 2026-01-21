<script lang="ts">
	import { page } from '$app/state';

	const { data } = $props();
	const { years } = data;

	const callback = $derived(decodeURIComponent(page.url.searchParams.get('callback') || ''));
	const callback_year = $derived(callback?.split('/')[1]);
</script>

{#each years as year}
	<div class="flex gap-0.5">
		<span class={[callback_year == year.id ? '' : 'invisible']}> * </span>
		<a href="/{year.id}">{year.id}</a>
	</div>
{/each}
