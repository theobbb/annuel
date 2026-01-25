<script lang="ts">
	import { page } from '$app/state';
	import type { ProjectsRecord } from '$lib/pocketbase.types';

	const { project }: { project: ProjectsRecord } = $props();
</script>

<a href="/{page.params.year}/projets/{project.id}">
	{project.name}
</a>
