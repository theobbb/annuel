<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { from_url }: { from_url?: string } = $props();

	const base_url = $derived(from_url || `/${page.params.year}/projets`);

	const { programs, program_type_map, program_stats } = $derived(page.data);

	const sorted_programs = $derived(
		[...programs].sort((a, b) => {
			// 1. Get the Type Sort Order
			const orderA = Number(program_type_map.get(a.type)?.sort_order) || 0;
			const orderB = Number(program_type_map.get(b.type)?.sort_order) || 0;

			// 2. If orders are different, sort by order
			if (orderA !== orderB) return orderA - orderB;

			// 4. Secondary Sort: Project Count inside the group
			const countA = Number(program_stats.get(a.id)?.project_count) || 0;
			const countB = Number(program_stats.get(b.id)?.project_count) || 0;

			return countB - countA; // Highest count first
		})
	);
</script>

<div class="mb-gap flex items-center justify-between gap-2">
	<div>Programmes <sup>{programs.length}</sup></div>
	<a
		href={url_query_param(from_url || `/${page.params.year}/projets`, { programme: null })}
		class="-mx-2 -my-1 flex w-fit items-center gap-1.5 px-2 py-1 lg:hidden"
	>
		<span>Tous les programmes</span>
		<div class="icon-[ri--arrow-right-long-line] translate-y-px"></div>
	</a>
</div>
<div>
	{#each sorted_programs as { id, name, code, description, type }}
		{@const stats = program_stats.get(id)}
		<div class="relative border-b first:border-t">
			<a
				class="peer absolute inset-0"
				href={url_query_param(base_url, { programme: id })}
				aria-label="Programme {name}"
			>
			</a>
			<div class="group lg:gap-x-2x lg:pt-1x grid-10 gap-y-0.5! pt-2 pb-8 transition lg:pb-8">
				<div class="col-span-8 text-muted transition max-lg:text-base lg:col-span-2">
					({program_type_map.get(type)?.name})
				</div>

				<div
					class="pointer-events-none col-span-10 text-xl/6 text-balance lg:col-span-5 lg:text-3xl"
				>
					<div class="pr-24- relative w-fit">
						<h2 class="">{name}</h2>

						<div class="absolute -right-3 bottom-0 flex translate-x-full justify-end">
							<div
								class="ease icon-[ri--arrow-right-long-line] -translate-y-px text-right text-2xl transition duration-200 not-group-peer-hover:-translate-x-4 not-group-peer-hover:opacity-0"
							></div>
						</div>
					</div>
				</div>

				<div class="col-span-2 max-lg:hidden">
					<div class="flex flex-col leading-relaxed whitespace-nowrap">
						{#if stats}
							<a
								class="pointer-events-auto relative z-10 w-fit"
								href="/{page.params.year}/projets?programme={id}"
							>
								<span>
									Projets
									<sup>{stats.project_count}</sup>
								</span>
							</a>
							<a
								class="pointer-events-auto relative z-10 w-fit"
								href="/{page.params.year}/finissant-es?programme={id}"
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
				</div>
			</div>
		</div>
	{/each}
</div>
