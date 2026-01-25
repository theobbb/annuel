<script lang="ts">
	const { file, back_href } = $props();

	$effect(() => {});
</script>

<a href={back_href} class="fixed inset-0 cursor-default bg-black/20 backdrop-blur"></a>
<div class="pointer-events-none fixed inset-gap">
	<div class="grid-12 relative z-10 h-[calc(100svh-2*var(--spacing-gap))]">
		<div class="relative col-span-full flex justify-center lg:col-span-10 lg:col-start-2">
			<div class="pointer-events-auto aspect-square max-h-full bg-neutral-200"></div>
		</div>
	</div>
</div>
