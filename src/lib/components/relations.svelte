<script lang="ts">
	import type {
		ProgramsRecord,
		ProjectsRecord,
		ProjectTagsRecord,
		StudentsRecord
	} from '$lib/pocketbase.types';
	import Program from './program.svelte';
	import Project from './project.svelte';
	import Student from './student.svelte';

	type Relations =
		| {
				type: 'project';
				ref: ProjectsRecord;
		  }
		| {
				type: 'student';
				ref: StudentsRecord;
		  }
		| {
				type: 'program';
				ref: ProgramsRecord;
		  }
		| {
				type: 'tags';
				ref: ProjectTagsRecord[];
		  }
		| {
				type: 'contact';
				ref: { name: string; href: string }[];
		  };

	const { relations }: { relations: Relations[] } = $props();
</script>

<div class="col-span-full lg:col-span-6">
	{#each relations as relation}
		<div
			class="whitespace-nowrap- flex justify-between gap-x-gap border-b py-px text-right last:border-b-0"
		>
			{#if relation.type == 'project'}
				<div class="text-2">Projet</div>
				<Project project={relation.ref} />
			{:else if relation.type == 'student'}
				<div class="text-2">Finissant-e</div>
				<Student student={relation.ref} />
			{:else if relation.type == 'program'}
				<div class="text-2">Programme</div>
				<Program program={relation.ref} />
			{:else if relation.type == 'tags'}
				<div class="text-2">Catégories</div>
				<div class="flex gap-gap">
					{#each relation.ref as tag}
						<div>{tag.name}</div>
						<!-- <a href="/{year}/projets?categorie={tag.id}">{tag.name}</a> -->
					{/each}
				</div>
			{:else if relation.type == 'contact'}
				<div class="text-2">Contact</div>
				<div class="flex gap-gap">
					{#each relation.ref as link}
						<a href={link.href}>{link.name}</a>
					{/each}
				</div>
			{/if}
		</div>

		<!-- <div class="flex justify-between gap-x-2">
			<div class="text-2">Catégories</div>
			<div class="flex gap-gap">
				{#each project.expand.tags as tag}
					<a href="/{year}/projets?categorie={tag.id}">{tag.name}</a>
				{/each}
			</div>
		</div> -->
	{/each}
</div>
