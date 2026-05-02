<script lang="ts">
	import { page } from '$app/state';
	const { text } = $derived(page.data.year);

	function splitIntoColumns(text: string, numCols: number): string[] {
		const normalized = text.replace(/\r\n/g, '\n').trim();
		const words = normalized.split(/(\s+)/); // keep whitespace tokens
		const total = normalized.length;
		const target = total / numCols;

		const cols: string[] = [];
		let current = '';
		let colIndex = 0;

		for (const word of words) {
			current += word;
			if (colIndex < numCols - 1 && current.length >= target) {
				cols.push(current.trim());
				current = '';
				colIndex++;
			}
		}
		cols.push(current.trim());

		return cols;
	}

	const columns = $derived(splitIntoColumns(text ?? '', 3));

	$inspect(columns);
</script>

<div class="col-span-full mt-12 grid grid-cols-3 gap-gap gap-x-gap max-md:hidden">
	{#each columns as col}
		<p class="leading-snug whitespace-pre-line">
			{col}
		</p>
	{/each}
</div>

<style>
	p {
		column-fill: balance;
		text-wrap: balance;
		break-inside: avoid;
	}
	/* p {
        text-align: justify;
        text-justify: inter-word;
        hyphens: auto;
    } */
</style>
