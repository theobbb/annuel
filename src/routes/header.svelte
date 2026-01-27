<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Logo from '$lib/components/logo.svelte';
	import Program from '$lib/components/program.svelte';
	import SelectYear from './select-year.svelte';

	const { year, programs, socials } = $derived(page.data);

	let pop_years_open = $state(false);
	let menu_mobile_open = $state(false);

	function open_menu_mobile() {
		menu_mobile_open = true;
		pop_years_open = true;
	}
	function close_menu_mobile() {
		menu_mobile_open = false;
		pop_years_open = false;
	}
	function toggle_menu_mobile() {
		if (menu_mobile_open) close_menu_mobile();
		else open_menu_mobile();
	}

	onNavigate(close_menu_mobile);
</script>

{#snippet links()}
	<div class={['flex w-full gap-x-gap py-0.5 max-md:flex-col']}>
		<a
			href="/{year}"
			class={[
				'max-md:border-t max-md:border-b max-md:py-1',
				page.route.id == '/[year]' && 'active'
			]}
		>
			Accueil + remerciements
		</a>
		<a
			href="/{year}/projets"
			class={[
				'max-md:border-b max-md:py-1',
				page.route.id?.startsWith('/[year]/projets') && 'active'
			]}
		>
			Projets
		</a>
		<a
			href="/{year}/finissant-e-s"
			class={[
				'max-md:border-b max-md:py-1',
				page.route.id?.startsWith('/[year]/finissant-e-s') && 'active'
			]}
		>
			Finissant-e-s
		</a>
	</div>
{/snippet}
<header
	class={[
		'z-200 mb-[calc(0.5*var(--spacing-section))] pt-2 max-md:sticky max-md:inset-y-gap-y max-md:top-0 max-md:bg-bg',
		menu_mobile_open && 'menu-open'
	]}
>
	<div class="relative z-100 flex items-center justify-between gap-x-gap border-b">
		<a href="/" class="py-0.5">Annuel de design</a>
		<div class="flex items-center gap-6">
			<div class="relative"><SelectYear bind:open={pop_years_open} /></div>
			<button
				class="-mr-px flex items-center md:hidden"
				onclick={toggle_menu_mobile}
				title="open menu"
			>
				<span
					class={[menu_mobile_open ? 'icon-[ri--close-fill]' : 'icon-[ri--menu-fill] ', 'text-lg']}
				></span>
			</button>
		</div>
	</div>

	<div class="flex gap-x-gap max-md:hidden">
		{@render links()}
	</div>
	{#if menu_mobile_open}
		<div class="fixed inset-0 z-50 overflow-y-scroll border-r border-b bg-bg md:hidden">
			<div class="mx-gap mt-16">
				<Logo />
				<div class="">
					<div class="text-2">Pages</div>
					<div class="text-lg font-thin!">
						{@render links()}
					</div>
				</div>
				<div class="mt-24">
					<div class="col-span-full md:col-span-6">
						<div class="text-2 mb-gap-y py-0.5">Programmes</div>
						{#each programs as program}
							<div class="ml-gap -indent-gap underline"><Program {program} /></div>
						{/each}
					</div>
				</div>
				<div class="mt-12">
					<div class="text-2 mb-gap-y py-0.5">Réseaux</div>
					{#each socials as { url, name }}
						<div><a class="underline" href={url} target="_blank">{name}</a></div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</header>
