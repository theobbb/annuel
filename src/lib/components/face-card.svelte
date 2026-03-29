<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { student }: { student?: StudentsRecord } = $props();

	const program = $derived(student ? page.data.program_map.get(student.program) : null);
</script>

<div class="@container relative aspect-2/3 overflow-hidden">
	<div class="rounded- absolute inset-0 border bg-placeholder">
		<img src="/temp/head.png" class="h-full w-full object-cover" />
		<!-- <div
			class="absolute inset-0 icon-[ri--user-fill] h-full w-full translate-y-1/6 scale-130"
		></div> -->
	</div>

	<div class="absolute top-0 right-0 z-5">
		<div
			class="rounded-bl-sm- bg-background px-2 text-[9cqw] leading-[12cqw] font-[450] tracking-wide mix-blend-difference"
		>
			<div class="translate-x-[1cqw] -translate-y-[1cqw]">{program?.code}</div>
		</div>
	</div>
</div>
