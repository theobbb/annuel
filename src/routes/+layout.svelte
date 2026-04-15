<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './footer.svelte';
	import {
		init_store_student_projects,
		use_store_student_projects
	} from '$lib/store/store-preview-student.svelte';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { init_seed } from '$lib/store/seed-ctx.svelte';

	const { data, children } = $props();

	const archive_page = $derived(page.route.id == '/archives');
	// init_store_student_projects();
	// const store_student_projects = use_store_student_projects();

	// onNavigate(() => {
	// 	store_student_projects.current = null;
	// });

	init_seed(data.seed);
</script>

<div
	class="mx-4 grid min-h-svh grid-rows-[1fr_auto] pt-4 font-[370] selection:bg-accent lg:mx-gap lg:text-lg"
>
	<div>
		{@render children()}
	</div>
	<Footer />
</div>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->
