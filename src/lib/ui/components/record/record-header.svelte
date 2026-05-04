<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import Header from '../header.svelte';

	const {
		back_href,
		title,
		description,
		aside,
		children
	}: {
		back_href: string;
		title: Snippet;
		description: string;
		aside: Snippet;
		children: Snippet;
	} = $props();

	const long_description = $derived(description?.length > 200);

	let has_history = $state(false);

	afterNavigate(({ from }) => {
		if (from) has_history = true;
	});

	function on_back(event: MouseEvent) {
		if (has_history) {
			event.preventDefault();
			window.history.back();
		}
	}

	const desc_len = $derived(Math.floor(description?.length / 100));
</script>

<Header></Header>
<div class="grid-10 mt-16 mb-12 min-h-[calc(100svh-27rem)] lg:mt-24 lg:mb-16">
	<div class="col-span-4 lg:col-span-2">
		<a
			href={back_href}
			onclick={on_back}
			class="-mx-2 -my-1 flex w-fit items-center gap-1 px-2 py-1"
		>
			<div class="icon-[ri--arrow-left-long-line]"></div>
			Retour
		</a>
	</div>

	<div class={['col-span-10 text-balance lg:col-span-6 lg:col-start-3 xl:col-span-5']}>
		<h2 class="mb-8 leading-tight lg:pr-44">
			{@render title()}
		</h2>
		<p
			class={[
				'leading-snug',
				desc_len > 8 ? '' : desc_len > 5 ? 'xl:pr-48' : desc_len > 3 ? 'xl:pr-64' : 'xl:pr-64'
			]}
		>
			{description}
		</p>
		<div class="col-span-8 col-start-3 mt-16 grid grid-cols-4 gap-gap">
			{@render children?.()}
		</div>
	</div>
	<div
		class="relative col-span-6 col-start-5 max-lg:row-start-1 lg:z-200 lg:col-span-2 lg:col-start-9 lg:-mt-32"
	>
		{@render aside()}
	</div>
	<!-- <div class="col-span-8 col-start-3 grid grid-cols-8 gap-gap">
		{@render children?.()}
	</div> -->
</div>
