<script lang="ts">
	import { page } from '$app/state';

	const year = $derived(page.params.year);
</script>

<header class="mb-12 flex gap-x-gap">
	<a href="/{year}">Accueil + remerciements</a>
	<a href="/{year}/projets">Projets</a>
	<a href="/{year}/finissant-e-s">Finissant-e-s</a>
	<a href="/annees?callback={encodeURIComponent(page.url.pathname)}">Années</a>
</header>
