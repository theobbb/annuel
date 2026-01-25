<script lang="ts">
	import { page } from '$app/state';

	const { year } = $derived(page.data);
</script>

<header class="sticky top-0 mb-12 flex gap-x-gap">
	<nav class="flex gap-x-gap">
		<a href="/{year}" class={[page.route.id == '/[year]' && 'active']}> Accueil + remerciements </a>
		<a href="/{year}/projets" class={[page.route.id?.startsWith('/[year]/projets') && 'active']}>
			Projets
		</a>
		<a
			href="/{year}/finissant-e-s"
			class={[page.route.id?.startsWith('/[year]/finissant-e-s') && 'active']}
		>
			Finissant-e-s
		</a>
	</nav>
</header>
