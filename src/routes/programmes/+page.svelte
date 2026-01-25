<script lang="ts">
	const { data } = $props();
	const { programs } = data;
</script>

{#each programs as program}
	<a class="" href="/programmes/{program.id}">
		<div>{program.name}</div>
	</a>
{/each}
