<script lang="ts">
	import ProgramName from '$lib/components/program-name.svelte';

	const { data } = $props();
	const { students, program, year } = $derived(data);
</script>

<div class="mb-12">
	<div class="mb-gap-y text-xl"><ProgramName {program} /></div>
	<div class="max-w-3xl text-balance">{program.description}</div>
</div>

<!-- <div class="">
	{#each students as student, i}
		<div class="grid grid-cols-12 gap-x-gap">
			<div>
				{#if student.last_name[0] != students[i - 1]?.last_name[0]}
					<div>{student.last_name[0]}</div>
				{/if}
			</div>
			<div class="col-span-11 flex gap-0.5">
				<span class={[student.scholarship ? '' : 'invisible']}>*</span>
				<a href="/{year}/finissant-e-s/{student.id}">{student.last_name}, {student.first_name}</a>
			</div>
		</div>
	{/each}
</div> -->
