<script lang="ts">
	import Program from '$lib/components/program.svelte';

	const { data } = $props();
	const { students, programs, year } = data;

	const programs_map = new Map(programs.map((program) => [program.id, program]));
</script>

<div class="flex max-w-3xl justify-between border-b">
	<div class="text-2">Programmes</div>
	<div class="flex flex-col text-right">
		{#each programs as program}
			<a class="" href="/{year}/programmes/{program.id}">
				<Program name={program.name} />
			</a>
		{/each}
	</div>
</div>

{#each students as student, i}
	<div class="grid grid-cols-12 gap-x-gap">
		<div>
			{#if student.last_name[0] != students[i - 1]?.last_name[0]}
				<div>{student.last_name[0]}</div>
			{/if}
		</div>
		<div class="col-span-6 flex gap-0.5">
			<span class={[student.scholarship ? '' : 'invisible']}>*</span>
			<a href="/{year}/finissant-e-s/{student.id}">{student.last_name}, {student.first_name}</a>
		</div>
	</div>
{/each}
