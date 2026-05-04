<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import { shuffle_array } from '$lib/utils/shuffle';

	const { students } = $derived(page.data);

	const seed = use_seed();
	const shuffled_students: StudentsRecord[] = $derived(
		shuffle_array<StudentsRecord>(students, seed.value)
	);
</script>

<div class="h-[60svh]">
	{#each shuffled_students as { id, headshot }}
		{#if headshot}
			<div class="grayscale- relative flex w-full items-center justify-center">
				<img
					src="{PUBLIC_POCKETBASE_URL}/api/files/students/{id}/{headshot}?format=webp&thumb=100x0"
					alt=""
					class=""
				/>
			</div>
		{/if}
	{/each}
</div>
