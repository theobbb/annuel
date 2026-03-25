<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { student }: { student: StudentsRecord } = $props();

	const program = $derived(page.data.program_map.get(student.program));
</script>

<div class="@container relative aspect-2/3 overflow-hidden">
	<div class="absolute inset-0 bg-placeholder">
		<div
			class="absolute inset-0 icon-[ri--user-fill] h-full w-full translate-y-1/6 scale-130"
		></div>
	</div>

	<div class="absolute top-0 right-0">
		<div class="bg-background px-1.5 text-[12cqw]">{program?.code}</div>
	</div>
</div>
