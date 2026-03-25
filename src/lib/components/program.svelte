<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';

	const { program, filter = false }: { program: ProgramsRecord; filter?: boolean } = $props();

	const year = $derived(page.data.year);
	const url_search_program = $derived(page.url.searchParams.get('programme') || '');

	const href: string = $derived.by(() => {
		//if (!filter) return `/${year}/programmes/${program.id}`;

		let route: string = page.route.id || '';
		route = route.replace('/[year]', '');
		route = route.split('[')[0];
		route = route.substring(1);
		const param: 'projets' | 'finissant-e-s' = route == 'projets' ? 'projets' : 'finissant-e-s';

		const url = `${page.url.origin}/${year}/${param}${page.url.search}`;
		return url_query_param(url, 'programme', url_search_program == program.id ? null : program.id);
	});
</script>

<a {href} class={[program.id == url_search_program && 'active']}>
	{program.code}
</a>
