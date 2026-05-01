<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	const { students } = $derived(page.data);
</script>

<div class="grid grid-cols-13 gap-gap">
	{#each students.slice(0, 27) as { id, headshot }}
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
