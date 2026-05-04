<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';
	import '$lib/style/markdown.css';

	import Footer from './footer.svelte';

	import { page } from '$app/state';
	import { init_seed } from '$lib/store/seed-ctx.svelte';

	const { data, children } = $props();

	init_seed(data.seed);
</script>

<div class="mx-gap text-base leading-normal antialiased lg:text-lg">
	<div class="mx-auto grid min-h-svh w-full max-w-480 grid-rows-[1fr_auto]">
		<div class="">
			{@render children()}
		</div>
		<Footer />
	</div>
</div>
