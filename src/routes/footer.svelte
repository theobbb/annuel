<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer
	class="black rounded-t-xl- text-lg- relative z-200 -mx-8 mt-16 flex flex-col justify-between gap-12 border px-8 py-5 pb-10 font-[370]"
>
	<div class="grid-12">
		<div class="col-span-2">
			<a href="/{page.params.year}">Annuel de design</a>
		</div>
		<div class="col-span-6">
			{#each socials as { url, name }}
				<div><a class="underline-" href={url} target="_blank">{name}</a></div>
			{/each}
		</div>
		<div class="col-span-3 text-base/4.5 font-normal text-white/50">
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="flex justify-end">
			<div class="max-w-16"><Uqam /></div>
		</div>
	</div>
</footer>
