<script lang="ts">
	import Program from '$lib/components/program.svelte';

	const { data } = $props();
	const { students, program, year } = data;
</script>

<div class="border-b">
	<div class="mb-gap-y text-xl"><Program name={program.name} /></div>
	<div class="max-w-lg text-balance">{program.description}</div>
	<div class="mt-12 max-w-3xl">
		<div class="flex justify-between gap-x-2">
			<div class="text-2">Finissant-e-s</div>
			<div class="">{students.length}</div>
		</div>
	</div>
</div>

<div class="">
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
</div>
