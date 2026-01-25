<script lang="ts">
	import './layout.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import { init_store_students } from '$lib/store/store-preview-student.svelte';

	let { children } = $props();

	init_store_students();
</script>

<div class="mx-gap grid min-h-svh grid-rows-[auto_1fr_auto] text-sm/4.5 text-balance">
	<Header />
	<div>
		{@render children()}
	</div>
	<Footer />
</div>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
