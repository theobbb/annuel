<script lang="ts">
	import { page } from '$app/state';

	const { programs, program_type_map, program_stats } = $derived(page.data);
</script>

<!-- <Title>Programmes</Title> -->
<div class="mt-8">
	{#each programs as { id, name, code, description, type }}
		{@const stats = program_stats.get(id)}
		<div
			class="group relative grid grid-cols-10 gap-2x border-b pt-1x pb-10 transition first:border-t hover:bg-accent"
		>
			<a
				class="peer absolute inset-0"
				href="/{page.params.year}/projets?programme={id}"
				aria-label="Programme {name}"
			>
			</a>
			<div class="col-span-8 text-muted transition max-lg:text-base lg:col-span-2">
				({program_type_map.get(type)?.name})
			</div>

			<div class="col-span-10 text-2xl max-lg:font-[430] lg:col-span-5 lg:text-3xl">
				<div class="relative w-fit">
					{name}
					<div class="absolute -right-3 bottom-0 flex translate-x-full justify-end">
						<div
							class="icon-[ri--arrow-right-long-line] text-right text-3xl transition not-group-hover:-translate-x-4 not-group-hover:opacity-0"
						></div>
					</div>
				</div>
			</div>

			<!-- <div class="col-span-2">{code}</div> -->
			<div class="col-span-6 text-right max-lg:col-start-3 lg:col-span-2">
				<div class="flex flex-col text-lg">
					{#if stats}
						<a
							class="relative z-10 flex w-fit items-center gap-1x"
							href="/{page.params.year}/projets?programme={id}"
						>
							<!-- <div class="size-2 bg-foreground"></div> -->
							<span>
								Projets
								<sup>{stats.project_count}</sup>
							</span>
						</a>
						<a
							class="relative z-10 flex w-fit items-center gap-1x"
							href="/{page.params.year}/finissant-e-s?programme={id}"
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

			<!-- <div
				class="col-start-12 flex justify-end transition not-peer-hover:translate-x-4 not-peer-hover:opacity-0"
			>
				<div class=" icon-[ri--arrow-right-long-line] text-right text-2xl"></div>
			</div> -->
		</div>
	{/each}
</div>
