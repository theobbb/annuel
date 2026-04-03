<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const current = $derived(page.url.searchParams.get('programme') || '');

	const tabs = $derived([
		{
			name: 'Projets',
			param: 'projets',
			length: page.data.n_projects
		},
		{
			name: 'Finissant.es',
			param: 'finissant-es',
			length: page.data.n_students
		}
	]);
	const current_tab = $derived(page.route.id?.split('/')[2]);
</script>

<div class="flex gap-3 whitespace-nowrap md:items-center lg:gap-2">
	{#each tabs as { name, param, length }}
		<a
			class={[
				'-my-1 block py-1',
				current_tab === param ? '' : ' not-hover:text-muted',
				'transition'
			]}
			href={url_query_param(`/${page.params.year}/${param}`, { programme: current || null })}
		>
			{name} <sup>{length}</sup>
		</a>
		<div class="text-muted last:hidden">/</div>
	{/each}
</div>
