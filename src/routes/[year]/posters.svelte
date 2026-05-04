<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { YearsRecord } from '$lib/pocketbase.types';

	const year: YearsRecord = $derived(page.data.year);
	const posters = $derived(year?.posters_1 || []);
</script>

<div class="grid-10 space-y-gap">
	<div class="col-span-6 col-start-3 space-y-gap">
		{#each posters as poster, i}
			<img
				class="svg border"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
				alt="poster {year.id} {i}"
			/>
		{/each}
	</div>
</div>

<div class="grid-10 mt-24">
	{#each posters as poster, i}
		<img
			src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{poster}"
			alt="poster {year.id} {i}"
			class="svg col-span-2 border"
		/>
	{/each}
</div>
