<script lang="ts">
	import '$lib/style/layout.css';
	import '$lib/style/fonts.css';

	const { data, children } = $props();
</script>

<div class="mx-4 grid min-h-svh grid-rows-[1fr_auto] pt-4 font-[350] lg:mx-gap lg:text-lg">
	<div>
		{@render children()}
	</div>
</div>
