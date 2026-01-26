<script>
	import { seed_placeholder_color } from '$lib/utils/seed';

	const { id, index } = $props();
</script>

<div class="aspect-square bg-placeholder" style={seed_placeholder_color(id, index)}></div>
