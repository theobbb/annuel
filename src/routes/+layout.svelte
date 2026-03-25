<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '../lib/ui/templates/header.svelte';
	import Footer from './footer.svelte';
	import {
		init_store_student_projects,
		use_store_student_projects
	} from '$lib/store/store-preview-student.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();

	const archive_page = $derived(page.route.id == '/archives');
	init_store_student_projects();
	const store_student_projects = use_store_student_projects();

	onNavigate(() => {
		store_student_projects.current = null;
	});
</script>

<div class="font-medium- mx-8 mt-5 min-h-svh text-3xl font-[430]">
	<div>
		{@render children()}
	</div>
	<Footer />
</div>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
