<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { from_url }: { from_url?: string } = $props();

	const base_url = $derived(from_url || `/${page.params.year}/projets`);

	const { programs, program_type_map, program_stats } = $derived(page.data);

	$inspect(page.data);
</script>

{#each programs as { id, name, code, description, type }, i}
	{@const stats = program_stats.get(id)}
	<div
		class="group lg:gap-x-2x lg:pt-1x min-h-24- pt-2- relative grid grid-cols-10 gap-1.5 border-b pb-5 transition first:border-t hover:bg-accent lg:pb-8"
	>
		<a
			class="peer absolute inset-0"
			href={url_query_param(base_url, { programme: id })}
			aria-label="Programme {name}"
		>
		</a>
		<!-- <div class="col-span-8 text-muted transition max-lg:text-base lg:col-span-2">
				({program_type_map.get(type)?.name})
			</div> -->

		<div class="col-span-10 text-balance lg:col-span-4">
			<!-- <div class="trapezoid relative w-full -translate-y-full bg-background">
					<div class="px-2 py-2 text-xl/6 lg:text-3xl">{name}</div>
				</div> -->
			<div class="-mt-px- flex w-full -translate-y-full bg-background">
				<svg
					width="14"
					height="100%"
					viewBox="0 0 14 50"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polyline
						points="14,0 0,50"
						fill="none"
						stroke="black"
						stroke-width="1"
						vector-effect="non-scaling-stroke"
					/>
				</svg>

				<div class="flex flex-1 items-center border-t border-black px-3">
					<div class="px-2 text-xl/6 lg:text-3xl">{name}</div>
				</div>

				<svg
					width="14"
					height="100%"
					viewBox="0 0 14 50"
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polyline
						points="0,0 14,50"
						fill="none"
						stroke="black"
						stroke-width="1"
						vector-effect="non-scaling-stroke"
					/>
				</svg>
			</div>
		</div>

		<!-- <div class="col-span-2 text-right max-lg:hidden">
				<div class="flex flex-col text-lg whitespace-nowrap">
					{#if stats}
						<a
							class="gap-1x relative z-10 flex w-fit items-center"
							href="/{page.params.year}/projets?programme={id}"
						>
							<span>
								Projets
								<sup>{stats.project_count}</sup>
							</span>
						</a>
						<a
							class="gap-1x relative z-10 flex w-fit items-center"
							href="/{page.params.year}/finissant-e-s?programme={id}"
						>
							<span>
								Finissant.e.s
								<sup>{stats.student_count}</sup>
							</span>
						</a>
					{/if}
				</div>
			</div>
			<div
				class="col-span-4 text-right text-muted transition max-lg:col-start-10 max-lg:row-start-1 max-lg:text-base lg:col-span-1"
			>
				{code}
			</div> -->
	</div>
	<!-- <hr /> -->
{/each}
