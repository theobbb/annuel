<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord, StudentsRecord } from '$lib/pocketbase.types';

	const { program }: { program?: ProgramsRecord } = $props();
</script>

<div class="absolute top-[3cqw] right-[3cqw] z-5">
	<div class="black px-[2cqw] py-[1cqw] text-[6cqw] leading-[100%] font-[450] tracking-[0.02em]">
		{program?.code}
	</div>
</div>
