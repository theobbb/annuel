<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import {
		init_store_student_projects,
		use_store_student_projects
	} from '$lib/store/store-preview-student.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	init_store_student_projects();
	const store_student_projects = use_store_student_projects();

	onNavigate(() => {
		store_student_projects.current = null;
	});
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
