<script lang="ts">
	const { data } = $props();
	const { programs } = $derived(data);
</script>

<div class="mb-gap-y max-w-lg text-balance">
	L’Annuel de design expose les projets des quelques 240 finissant.es provenant des six programmes
	de l’École de design de l’UQAM. C’est un évènement d’envergure qui accueille, depuis 2015, plus de
	3000 personnes à chaque année.
</div>

<div class="">
	{#each programs as program}
		<div class="col-span-3 col-start-4 mb-12 text-balance">
			<div class="mb-gap-y max-w-xl text-xl/6">{program.name}</div>
			<div class="line-clamp-3 max-w-2xl">{program.description}</div>
		</div>
	{/each}
</div>
