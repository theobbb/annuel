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
			<div class="sticky top-17">
				<img
					class="svg border bg-white"
					src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
					alt="poster {year.id} {i}"
				/>
			</div>
		</div>
		<div class="col-span-8 col-start-3 h-full">
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
