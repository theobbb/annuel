<script lang="ts">
	import Program from '$lib/components/program.svelte';

	const { data } = $props();
	const { students, programs, year } = $derived(data);

	const programs_map = new Map(programs.map((program) => [program.id, program]));
</script>

<div class="border-b- flex items-end justify-between pb-gap-y">
	<div class="text-right- flex flex-col">
		{#each programs as program}
			<Program {program} />
		{/each}
	</div>
	<div>* Récipiendaire de bourse</div>
</div>

<div class="">
	{#each students as student, i}
		<div class="grid grid-cols-12 gap-x-gap">
			<div class="col-start-3">
				{#if student.last_name[0] != students[i - 1]?.last_name[0]}
					<div>{student.last_name[0]}</div>
				{/if}
			</div>
			<div class="col-span-6 col-start-4 flex gap-0.5">
				<span class={[student.scholarship ? '' : 'invisible']}>*</span>
				<a href="/{year}/finissant-e-s/{student.id}">{student.last_name}, {student.first_name}</a>
			</div>
		</div>
	{/each}
</div>
