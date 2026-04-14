<script lang="ts">
	import { page } from '$app/state';
	import type { StudentsRecord } from '$lib/pocketbase.types';

	const { student }: { student?: StudentsRecord } = $props();

	const program = $derived(student ? page.data.program_map.get(student.program) : null);
</script>

<div class="group @container relative aspect-2/3 overflow-hidden">
	<div class="rounded- absolute inset-0 border bg-placeholder">
		<img
			src="/temp/head.png"
			class="h-full w-full object-cover transition duration-50000 group-hover:scale-2000"
		/>
		<!-- <div
			class="absolute inset-0 icon-[ri--user-fill] h-full w-full translate-y-1/6 scale-130"
		></div> -->
	</div>

	<div class="absolute top-[3cqw] right-[3cqw] z-5">
		<div class=" black px-[2cqw] py-[1cqw] text-[6cqw] leading-[100%] font-[450] tracking-[0.02em]">
			{program?.code}
		</div>
	</div>
</div>
