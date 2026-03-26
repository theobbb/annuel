<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import { pocketbase } from '$lib/pocketbase';
	import type { SponsorsRecord } from '$lib/pocketbase.types';
	import Title from '$lib/ui/components/title.svelte';

	const sponsors: SponsorsRecord[] = $derived(page.data.sponsors);

	const sizes = ['w-[8vw]', 'w-[15vw]', 'w-[28vw]'];
</script>

<div>
	<Title>Commanditaires</Title>
	<!-- <div class="mb-32 grid grid-cols-6 gap-8 pt-8">
		{#each sponsors as { id, name, size, logo }}
			<div
				class={['h-fit border-2 p-3']}
				style="grid-column: span {Number(size)} / span {Number(size)};"
			>
				<img src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}" alt="" />
			</div>
		{/each}
	</div> -->
	<div class="mr-32 mb-32 flex flex-wrap gap-6 pt-8">
		{#each sponsors as { id, name, size, logo }}
			<div class={['border-2- h-fit p-3', sizes[size - 1]]}>
				<img
					class="h-full w-full"
					src="{PUBLIC_POCKETBASE_URL}/api/files/sponsors/{id}/{logo}"
					alt=""
				/>
			</div>
		{/each}
	</div>
</div>
