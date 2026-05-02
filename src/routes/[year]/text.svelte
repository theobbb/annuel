<script lang="ts">
	import { page } from '$app/state';
	const { text } = $derived(page.data.year);
</script>

<p
	class="col-span-full mt-12 columns-3 gap-gap gap-x-gap leading-snug whitespace-pre-line max-md:hidden"
>
	{text}
</p>

<style>
	/* p {
		column-fill: balance;
		text-wrap: balance;
		break-inside: avoid;
	} */
	p {
		text-align: justify;
		text-justify: inter-word;
		hyphens: auto;
	}
</style>
