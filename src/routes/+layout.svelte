<script lang="ts">
	import './layout.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<div class="mx-4 my-2.5 text-sm/4.5">
	{@render children()}
</div>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
