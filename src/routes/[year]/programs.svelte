<script lang="ts">
	import { page } from '$app/state';
	import { url_query_param } from '$lib/utils/url';

	const { from_url }: { from_url?: string } = $props();

	const base_url = $derived(from_url || `/${page.params.year}/projets`);

	const { programs, program_types, program_type_map, program_stats } = $derived(page.data);

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

	$inspect(sorted_programs, program_type_map, program_stats);
</script>

<!-- <Title>Programmes</Title> -->
<div>Programmes <sup>{programs.length}</sup></div>
<div class="mt-8">
	{#each sorted_programs as { id, name, code, description, type }}
		{@const stats = program_stats.get(id)}
		<div
			class="group lg:gap-x-2x lg:pt-1x relative grid grid-cols-10 gap-1.5 border-b pt-2 pb-5 transition first:border-t lg:pb-8"
		>
			<a
				class="peer absolute inset-0"
				href={url_query_param(base_url, { programme: id })}
				aria-label="Programme {name}"
			>
			</a>
			<div class="col-span-8 text-muted transition max-lg:text-base lg:col-span-2">
				({program_type_map.get(type)?.name})
			</div>

			<div class="pointer-events-none col-span-10 text-xl/6 text-balance lg:col-span-5 lg:text-3xl">
				<div class="pr-24- relative w-fit">
					<h2>{name}</h2>

					<div class=" absolute -right-3 bottom-0 flex translate-x-full justify-end">
						<div
							class="icon-[ri--arrow-right-long-line] text-right text-3xl transition not-group-hover:-translate-x-4 not-group-hover:opacity-0"
						></div>
					</div>
				</div>
			</div>

			<div class="col-span-2 text-right max-lg:hidden">
				<div class="flex flex-col text-lg whitespace-nowrap">
					{#if stats}
						<a
							class="gap-1x relative z-10 flex w-fit items-center"
							href="/{page.params.year}/projets?programme={id}"
						>
							<!-- <div class="size-2 bg-foreground"></div> -->
							<span>
								Projets
								<sup>{stats.project_count}</sup>
							</span>
						</a>
						<a
							class="gap-1x relative z-10 flex w-fit items-center"
							href="/{page.params.year}/finissant-es?programme={id}"
						>
							<!-- <div class="size-2 bg-foreground"></div> -->
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
	{/each}
</div>
