<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Header from '$lib/ui/components/header.svelte';

	let last_history_year: string | null = $state(null);

	afterNavigate(({ from }) => {
		if (from) last_history_year = from.params?.year || null;
	});
</script>

<Header archive_history_year={last_history_year} />
