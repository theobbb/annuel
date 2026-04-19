<script lang="ts">
	import { page } from '$app/state';

	const { programs } = $derived(page.data);
</script>

<div class="">
	<div class="text-muted- text-[3vw] leading-[122%] font-[350] tracking-[-2.5%] text-black/85">
		L’Annuel de design expose <br /> les
		<a
			class="relative -mt-1 -mb-2.5 ml-0.5 inline-flex gap-2 rounded bg-black/85 px-2 pb-2.5 leading-[100%] text-white"
			href="/{page.params.year}/projets"
		>
			<!-- <div class="bg-accent- border- absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%]"></div> -->
			projets
			<span class="inline-block -translate-y-[0.5em] text-[1.25vw]!"> {page.data.n_projects} </span>
		</a>

		des
		<a
			class="relative -mt-1 -mb-2.5 ml-0.5 inline-flex gap-2 rounded bg-black/85 px-2 pt-0.5 pb-2.5 leading-[100%] text-white"
			href="/{page.params.year}/finissant-es"
		>
			<!-- <div
				class="bg-accent- absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] rounded border"
			></div> -->

			finissant.es
			<span class="inline-block -translate-y-[0.5em] text-[1.25vw]!"> {page.data.n_students} </span>

			<!-- <sup class="text-[1.25vw]!"> 130 </sup> -->
		</a>

		<br /> de l’École de design de l’UQAM.
	</div>
</div>

<style>
	sup {
		@apply inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400];
	}
</style>
