<script lang="ts">
	import Title from './title.svelte';

	const { banner } = $props();

	let hidden = $state(false);
</script>

{#if !hidden}
	<div class="-mx-8 -mt-5 mb-5 bg-[#fbff1f] px-8 py-5 pb-10">
		<div class="mb-16 flex items-center justify-between">
			<div>{banner.title}</div>
			<div>
				<button onclick={() => (hidden = true)} class="icon-[ri--close-line]" title="fermer message"
				></button>
			</div>
		</div>
		<div class="grid-12">
			{#each banner.items as { title, body, link }}
				<div class="col-span-4">
					<Title>
						{title}
					</Title>

					<div class="mt-3.5 whitespace-pre">
						{body}
					</div>
					{#if link}
						<a href={link.url} class="black my-6 block px-2 py-2 text-center">
							{link.label}
						</a>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
