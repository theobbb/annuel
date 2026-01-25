<script lang="ts">
	import { page } from '$app/state';

	let { open = $bindable(false) } = $props();
	const { year, years } = $derived(page.data);

	//let pop_years_open = $state(open);

	const other_year_href = $derived.by(() => {
		let route: string = page.route.id || '/';

		route = route.replace('/[year]', '');

		route = route.split('[')[0];

		route += page.url.search;
		return route;
	});
</script>

<button
	class="flex cursor-pointer items-center gap-x-1 py-0.5 hover:underline"
	onclick={() => (open = !open)}
>
	<span class="icon-[ri--expand-up-down-line]"></span>
	{year}
</button>
{#if open}
	<div
		class=" absolute bottom-0 z-200 flex translate-y-full flex-col divide-y border bg-bg text-right md:right-0"
	>
		{#each years as y}
			<a
				class={[
					'px-gap text-center hover:bg-black/10 max-md:py-1',
					y.id == year ? 'active bg-black/10 ' : '',
					''
				]}
				href="/{y.id}{other_year_href}">{y.id}</a
			>
		{/each}
	</div>
{/if}
