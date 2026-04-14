<script lang="ts">
	import { page } from '$app/state';

	const { programs } = $derived(page.data);
</script>

<div class="">
	<div class="text-[3.5vw] leading-[120%] font-[320] tracking-[-2%]">
		L’Annuel de design expose <br /> les
		<a class="relative ml-0.5 inline-block" href="/{page.params.year}/projets">
			<div class="absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] bg-accent"></div>
			projets
			<sup> 458 </sup>
		</a>

		des
		<a class="relative ml-0.5 inline-block" href="/{page.params.year}/finissant-es">
			<div class="absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] bg-accent"></div>

			finissant.es
			<sup> 130 </sup>
		</a>

		<br /> de l’École de design de l’UQAM.
	</div>
</div>

<style>
	sup {
		@apply inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400];
	}
</style>
