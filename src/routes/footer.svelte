<script lang="ts">
	import { page } from '$app/state';
	import Uqam from '$lib/assets/uqam.svelte';
	import Header from '$lib/ui/components/header.svelte';

	const { year, programs, socials } = $derived(page.data);
</script>

<footer
	class="min-h-svh- -mx-3x flex flex-col justify-between gap-12 bg-dark-background px-8 py-5 text-dark-foreground"
>
	<div>
		<Header footer>
			<div class="col-span-2 col-start-8">
				{#each socials as { url, name }}
					<div><a class="underline-" href={url} target="_blank">{name}</a></div>
				{/each}
			</div>
		</Header>
		<div class="grid-12">
			<!-- <div class="col-span-full md:col-span-6">
				<div class="mb-gap-y py-0.5">Description des programmes</div>
				<div class="">
					{#each programs as program}
						<div class="ml-gap- -indent-gap- underline"><Program {program} /></div>
					{/each}
				</div>
			</div> -->

			<!-- <div class="col-span-2 col-start-8">
				{#each socials as { url, name }}
					<div><a class="underline" href={url} target="_blank">{name}</a></div>
				{/each}
			</div> -->
		</div>
	</div>
	<div class="grid-12 hidden items-end text-sm/4.5">
		<div class="col-span-4">
			© {page.params.year} Annuel de design — Tous droits réservés <br />
			Les œuvres présentées demeurent la propriété <br /> de leurs auteur.rice.s respectif.ve.s.
		</div>
		<div class="col-span-2">Crédits</div>
		<div class="col-span-2 col-start-11 flex items-end justify-end">
			<div><Uqam /></div>
		</div>
	</div>
</footer>
