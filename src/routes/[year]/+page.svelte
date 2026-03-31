<script lang="ts">
	import { page } from '$app/state';
	import Members from './members.svelte';
	import Programs from './programs.svelte';
	import Sponsors from './sponsors.svelte';

	import Header from '$lib/ui/components/header.svelte';
	import Banner from '$lib/ui/components/banner.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Video from '$lib/ui/components/video.svelte';

	const { data } = $props();
	const { year, programs } = $derived(data);
</script>

<!-- <div class="mb-32 min-h-[50svh] border-b text-[4vw] leading-[110%]">
	L’Annuel de design <br /> expose les
	<div class=" border- inline-block px-4">projets <sup>458</sup></div>
	<br />
	des
	<div class=" border- inline-block px-4">finissant.es <sup>130</sup></div>
	<br />
	provenant des programmes <sup>7</sup> <br /> de l’École de design de l’UQAM.
</div> -->
<!-- <Banner banner={data.globals.banner} /> -->
<Header>
	<a
		class="col-span-4 col-start-9 row-start-1 text-right sm:col-span-4 sm:col-start-9 sm:row-start-2 lg:col-span-1 lg:col-start-10 lg:row-start-1"
		href="/archives"
	>
		Archives
	</a>
</Header>
<div class="-mt-10 grid grid-cols-10 gap-2x">
	<!-- <div class="border-b- col-span-6 mb-32 min-h-[50svh] text-[2vw] leading-[115%]">
		L’Annuel de design <br /> expose les
		<div class=" border- px-4- underline- inline-block">projets <sup>458</sup></div>
		<br />
		des
		<div class=" border- px-4- underline- inline-block">finissant.es <sup>130</sup></div>
		<br />
		provenant des programmes <sup>7</sup> <br /> de l’École de design de l’UQAM.
	</div> -->
	<div class="col-span-full row-start-1 flex items-end lg:col-span-2 lg:col-start-1">
		<div class="-mb-[0.12em] -ml-[0.05em] text-[14vw] leading-[100%] font-[250] tracking-[-7%]">
			’{page.params.year?.slice(2)}
		</div>
	</div>
	<div class="col-span-2 flex items-end">
		<div class=" size-[9.5vw] bg-accent"></div>
	</div>
	<div class="relative z-200 col-span-2 col-start-8">
		<div class="aspect-2/3 bg-placeholder">
			<img
				class="h-full w-full"
				src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{year.poster}"
			/>
		</div>
	</div>

	<div class="col-span-7 col-start-1 aspect-video">
		<div class="-mx-3x- aspect-video bg-placeholder">
			<!-- <Video autoplay playback_id="P3WEcj3FPpoxgFHcqU16hXo1NpJxUCsi00fcW1GnHNw00" /> -->
		</div>
	</div>
	<div class="col-span-2 col-start-6 my-1x text-sm/4 text-muted">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
	<div class="col-span-2 col-start-9 my-1x text-sm/4 text-muted">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div>
<div class="col-span-6 mb-32 text-[4vw] leading-[115%] font-[320] tracking-[-2%]">
	L’Annuel de design <br /> expose les
	<div class="relative ml-0.5 inline-block">
		<div class="absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] bg-accent"></div>
		projets
		<sup class="inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400]">
			458
		</sup>
	</div>
	<br />
	des
	<div class="relative ml-0.5 inline-block">
		<div class="absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] bg-accent"></div>

		finissant.es
		<sup class="inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400]">
			130
		</sup>
	</div>
	<br />
	provenant des
	<div class="relative ml-0.5 inline-block">
		<div class="absolute -inset-x-2 -inset-y-0.5 -z-10 translate-y-[4%] bg-accent"></div>

		programmes
		<sup class="inline-block translate-x-[-0.2em] translate-y-[-0.7em] text-[1.5vw] font-[400]">
			{programs.length}
		</sup>
	</div>
	<br /> de l’École de design de l’UQAM.
</div>

<!-- Les projets présentés par les finissant.es <br /> de l’École de design de l’UQAM, <br />
		révélant la richesse des démarches <br /> et la diversité des approches en design. -->

<!-- L’Annuel de design est une exposition présentant les projets des
		finissantes et finissants de l’école de design de l’UQAM, mettant en lumière la diversité des
		démarches et des approches en design. -->
<!-- <div class="mt-48 grid grid-cols-10 gap-8">
	<div class="col-span-6 col-start-3 aspect-video bg-placeholder">
		<div class="-mx-3x- aspect-video bg-placeholder"></div>
	</div>
	<div class="col-span-2 my-1x flex items-end text-sm/4 text-muted">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div> -->

<div class="mt-24 mb-64">
	<Programs />
</div>
<div class="mb-48"><Sponsors /></div>
<div><Members /></div>
<!-- <div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div> -->
<!-- <div><Members /></div> -->

<!-- <Banner banner={data.globals.banner} /> -->
<!-- <div class="mb-8 text-5xl/13">
		Les projets des finissant.es <br />
		de l’École de design de l’UQAM.
	</div> -->

<!-- <Header></Header> -->

<!-- <a class="border bg-black/5 px-3 py-1 text-lg font-medium" href="/{page.params.year}/projets"
	>Projets</a
>
<a class="border bg-black/5 px-3 py-1 text-lg font-medium" href="/{page.params.year}/finissant-e-s"
	>Finissant.e.s</a
> -->
<!-- <div class="-mt-90">
	<div class="-mx-3x- aspect-video bg-placeholder">
		<iframe
			src="https://player.mux.com/P3WEcj3FPpoxgFHcqU16hXo1NpJxUCsi00fcW1GnHNw00?metadata-video-title=VIDEOANNUEL2026_FINAL&video-title=VIDEOANNUEL2026_FINAL"
			style="width: 100%; border: none; aspect-ratio: 16/9;"
			allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
			allowfullscreen
		></iframe>
	</div>
	<div class="my-1x text-right text-sm/4">
		Vidéo par Kathrynf Mills, George Miller, Heather Ruiz, Christina Griffith
	</div>
</div> -->

<!-- <div class="mt-24 mb-64">
	<Programs {programs} {program_types} {program_stats} />
</div> -->
<!-- <div class="mt-24 min-h-[80svh]">
	<Sponsors />
</div> -->
<!-- <div><Members /></div> -->

<!-- <div
	class={[
		'pointer-events-none fixed right-0 bottom-0 left-0',
		scroll_top ? '' : 'translate-y-59- opacity-0- translate-y-full',
		'transition duration-500 ease-in-out'
	]}
>
	<div class="grid-12 translate-x-8- mx-8">
		<div class="col-span-4"></div>
		{#each buttons as { name, param, n }}
			<a class="pointer-events-auto col-span-4" href="/{page.params.year}/{param}">
				<div class="min-h-32 rounded-t-sm bg-black px-8 py-5 text-background">
					<div class="flex items-center justify-between gap-4">
						<div>{name} <sup>{n}</sup></div>
						<div class="icon-[ri--arrow-right-long-line]"></div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div> -->

<svelte:head>
	<title>Annuel de design {page.params.year}</title>
	<meta
		name="description"
		content="Annuel de design {page.params
			.year} Les projets des finissantes et finissants de l’école de design de l’UQAM"
	/>
</svelte:head>
