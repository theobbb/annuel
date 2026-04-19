<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="">
	{@render children()}

	<div class="border-b- mt-8"></div>
	<!-- Programmes -->

	<div class="bg-tab- translate-y-full- right-0 bottom-px left-0 flex h-54 justify-between">
		<div class="relative z-20 h-full">
			{@render edge()}
		</div>
		<div class="relative z-1000 -mx-px flex-1 bg-background">
			<svg
				class="h-full w-full"
				preserveAspectRatio="none"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -3.1 6 27.2"
			>
				<path
					d="M6-3 0-3M0 0 6 0"
					stroke="black"
					stroke-width="1"
					vector-effect="non-scaling-stroke"
					fill="none"
				/>
			</svg>
		</div>
		<div class="relative z-20 h-full -scale-x-100">
			{@render edge()}
		</div>
	</div>
</div>

{#snippet edge()}
	<svg class="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="-0.1 -3.1 6.2 27.2">
		<path
			d="M6-3 1-3 0 0 6 0M0 0 6 24"
			stroke="black"
			stroke-width="1"
			vector-effect="non-scaling-stroke"
			fill="none"
		/>
	</svg>
{/snippet}
