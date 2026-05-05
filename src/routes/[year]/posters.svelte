<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { YearsRecord } from '$lib/pocketbase.types';

	const year: YearsRecord = $derived(page.data.year);
	const posters = $derived(year?.posters_1 || []);
</script>

<div class="grid-10 relative gap-y-gap">
	{#each posters as poster, i}
		<div class="relative col-span-2 col-start-1 max-md:hidden">
			<div class="sticky top-15 lg:top-17">
				<img
					class="svg max-h-[calc(100svh-5rem)] border bg-white lg:max-h-[calc(100svh-6rem)]"
					src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
					alt="poster {year.id} {i}"
				/>
			</div>
		</div>
		<div class="col-span-8 col-start-2 h-full md:col-span-8 md:col-start-3">
			<img
				class="svg border bg-white"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
				alt="poster {year.id} {i}"
			/>
		</div>
	{/each}
</div>

<!-- <div class="grid-10 mt-24">
	{#each posters as poster, i}
		<img
			src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
			alt="poster {year.id} {i}"
			class="svg col-span-2 border"
		/>
	{/each}
</div> -->
