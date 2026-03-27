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
			name: 'Finissant.e.s',
			param: 'finissant-e-s',
			length: page.data.n_students
		}
	]);
	const current_tab = $derived(page.route.id?.split('/')[2]);
</script>

<div class="flex items-center gap-4 whitespace-nowrap">
	{#each tabs as { name, param, length }}
		<a
			class={[
				'no-hover font-[430]- block  text-center',
				current_tab === param ? '' : ' not-hover:text-black/40',
				'transition'
			]}
			href={url_query_param(`/${page.params.year}/${param}`, { programme: current || null })}
		>
			{name} <sup>{length}</sup>
		</a>
		<div class="text-muted last:hidden">/</div>
	{/each}
</div>
