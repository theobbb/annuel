<script lang="ts">
	const { data } = $props();
	const { programs, year } = data;
</script>

{#each programs as program}
	<a class="" href="/{year}/programmes/{program.id}">
		<div>{program.name}</div>
	</a>
{/each}
