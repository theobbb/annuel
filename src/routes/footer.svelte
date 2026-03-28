<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer
	class="black relative z-200 -mx-8 mt-16 flex min-h-svh flex-col justify-between px-8 py-5 pb-6 font-[370]"
>
	<div>
		<Header>
			<div class="col-span-2 col-start-9 row-span-3 row-start-1">
				<div class="aspect-2/3 bg-white/10"></div>
			</div>
			<div class="col-span-2 col-start-11 row-start-1 flex justify-end">Archives</div>
			<div class="col-span-2 col-start-9 row-start-4">
				{#each socials as { url, name }}
					<div><a class="underline-" href={url} target="_blank">{name}</a></div>
				{/each}
			</div>
		</Header>
	</div>
	<div class="grid-12 items-end">
		<div
			class="col-span-10 col-start-1 leading-tight font-normal text-white/50 max-lg:text-sm/4.5 lg:col-span-6"
		>
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="col-span-2 col-start-9 leading-tight font-normal text-white/50">Crédits</div>
		<div class="col-start-12 flex justify-end">
			<div class="max-w-24"><Uqam /></div>
		</div>
	</div>
</footer>
