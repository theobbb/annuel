<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer class="black relative z-200 -mx-8 mt-16 px-8 py-5 pb-10 font-[370]">
	<div class="grid-12">
		<div class="col-span-2">
			<a href="/{page.params.year}">Annuel de design '{page.params.year?.slice(-2)}</a>
		</div>
		<div class="col-span-2 flex flex-col">
			<a href="/archives">Archives</a>

			<a href="/archives">Projets</a>
			<a href="/archives">Finissant.e.s</a>
		</div>
		<div class="col-span-2">
			{#each socials as { url, name }}
				<div><a class="underline-" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-span-3 col-start-9 text-base/4.5 font-normal text-white/50">
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="col-start-12 flex justify-end">
			<div class="max-w-16"><Uqam /></div>
		</div>
	</div>
</footer>
