<script lang="ts">
	import { page } from '$app/state';

	const { programs } = $derived(page.data);
</script>

<div class="">
	<div class="text-muted- text-[2vw] leading-[110%] font-[320] tracking-[-2.5%] text-black/85">
		L’<span class="text-muted">Annuel de design</span> expose <br /> les
		<a
			class="ring- relative -mt-1 -mb-2.5 ml-0.5 inline-flex gap-2 px-2 pb-2.5 leading-[100%] ring-border"
			href="/{page.params.year}/projets"
		>
			Projets
			<span class="-ml-1 inline-block -translate-y-[0.5em] text-[1.25vw]!">
				{page.data.n_projects}
			</span>
		</a>

		des
		<a
			class="ring- relative -mt-1 -mb-2.5 ml-0.5 inline-flex gap-2 px-2 pt-0.5 pb-2.5 leading-[100%] ring-border"
			href="/{page.params.year}/finissant-es"
		>
			Finissant.es
			<span class="-ml-1 inline-block -translate-y-[0.5em] text-[1.25vw]!">
				{page.data.n_students}
			</span>
		</a>

		<br /> de l’École de design de l’UQAM.
	</div>
</div>

<style>
	sup {
		@apply inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400];
	}
</style>
