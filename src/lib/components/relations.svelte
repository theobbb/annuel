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
	import Students from './students.svelte';
	import Tag from './tag.svelte';
	import Tags from './tags.svelte';

	type Relations =
		| {
				type: 'project';
				ref: ProjectsRecord;
		  }
		| {
				type: 'student';
				ref: StudentsRecord;
				trigger_preview?: boolean;
		  }
		| {
				type: 'students';
				ref: StudentsRecord[];
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

<div class="">
	{#each relations as relation}
		<div class="flex justify-between gap-x-gap border-b py-px text-right last:border-b-0">
			{#if relation.type == 'project'}
				<div class="text-2">Projet</div>
				<Project project={relation.ref} />
			{:else if relation.type == 'student'}
				<div class="text-2">Finissant-e</div>
				<Student
					student={relation.ref}
					trigger_preview={relation.trigger_preview == undefined ? true : relation.trigger_preview}
				/>
			{:else if relation.type == 'students'}
				<div class="text-2">Finissant-e-s</div>
				<Students students={relation.ref} />
			{:else if relation.type == 'program'}
				<div class="text-2">Programme</div>
				<Program program={relation.ref} />
			{:else if relation.type == 'tags'}
				<div class="text-2">Catégories</div>
				<Tags tags={relation.ref} />
			{:else if relation.type == 'contact'}
				<div class="text-2">Contact</div>
				<div class="flex">
					{#each relation.ref as link}
						<a href={link.href}>{link.name}</a>
						<span class="mr-1 last:hidden">,</span>
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
