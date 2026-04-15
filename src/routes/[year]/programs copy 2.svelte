<script lang="ts">
	import { page } from '$app/state';
	import type { ProgramsRecord, ProgramTypesRecord } from '$lib/pocketbase.types';
	import { url_query_param } from '$lib/utils/url';
	import ProgramTab from './program-tab.svelte';

	const { from_url }: { from_url?: string } = $props();

	const base_url = $derived(from_url || `/${page.params.year}/projets`);

	const { programs, program_types, program_type_map, program_stats } = $derived(page.data);

	const groups: { type: ProgramTypesRecord; children: ProgramsRecord[] }[] = $derived.by(() => {
		return program_types?.map((type) => ({
			type,
			children: programs.filter((program) => program.type === type.id)
		}));
	});
	$inspect(groups);

	let cursor_tab_i = -1;
	function get_tab_i() {
		cursor_tab_i++;
		return cursor_tab_i;
	}
</script>

<div class="">Programmes</div>
{#each groups as { type, children }, group_i}
	<ProgramTab name={type.name} i={get_tab_i()} parent>
		{children.length}
	</ProgramTab>
	{#each children as { id, name, code, description, type }, i}
		{@const stats = program_stats.get(id)}
		<ProgramTab {name} i={get_tab_i()}>
			<div class="bg-black/80 px-2 text-white">{code}</div>
		</ProgramTab>
		<div
			class="group lg:gap-x-2x lg:pt-1x min-h-24- pt-2- relative hidden! border-b pb-5 transition first:border-t hover:bg-accent lg:pb-8"
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

			<!-- <div class="trapezoid relative w-full -translate-y-full bg-background">
						<div class="px-2 py-2 text-xl/6 lg:text-3xl">{name}</div>
					</div> -->

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
{/each}
