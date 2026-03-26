<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer class="black -mx-3x flex flex-col justify-between gap-12 px-8 py-5">
	<div class="grid-12">
		<div class="col-span-4">Annuel de design</div>
		<div class="col-span-2">
			{#each socials as { url, name }}
				<div><a class="underline-" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-span-4 text-sm/4.5">
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div>
			<div class="max-w-16"><Uqam /></div>
		</div>
	</div>
</footer>
