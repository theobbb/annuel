<script lang="ts">
	import { dev } from '$app/environment';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';

	const { data } = $props();
	const { year } = $derived(data);

	let video: HTMLVideoElement | null = $state(null);
	let playing = $state(false);
	let loading = $state(false);

	let posterRefs: HTMLDivElement[] = $state([]);
	const posterConfigs = [
		[-10, 20, -30],
		[15, -5, 20],
		[50, 20, -5],
		[80, -20, 10]
	];

	let vectors = $state(posterConfigs.map(() => ({ x: 0, y: 0 })));

	function play() {
		if (loading) return;

		vectors = posterConfigs.map(([left, top], i) => {
			const el = posterRefs[i];
			if (!el) return { x: 0, y: 0 };

			const rect = el.getBoundingClientRect();
			const containerRect = el.parentElement!.getBoundingClientRect();

			// Calculate movement vector based on center logic
			const centerX = left + ((rect.width / containerRect.width) * 100) / 2;
			const centerY = top + ((rect.height / containerRect.height) * 100) / 2;

			const dx = centerX - 50;
			const dy = centerY - 50;
			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			const distance = 60;

			return {
				x: (dx / len) * distance,
				y: (dy / len) * distance
			};
		});

		loading = true;
		playing = true;
		video?.play().finally(() => (loading = false));
	}

	function pause() {
		if (video?.seeking) return;
		playing = false;
		video?.pause();
	}
</script>

<Video
	bind:video
	autoplay={false}
	loop={false}
	controls={playing}
	onended={() => (playing = false)}
	onpause={() => pause()}
	playback_id="14W025RvjQdhvGaDyE4jHmKtWzQcIyA5PJNtRl7dLbmA"
	class="h-full w-full"
/>

{#if year?.poster}
	<div
		class={[
			'pointer-events-none absolute inset-0 flex overflow-hidden',
			playing && 'opacity-0 transition-opacity delay-600 duration-500'
		]}
	>
		{#each posterConfigs as [left, top, rotate], i}
			<div
				bind:this={posterRefs[i]}
				style="
                    transform: 
                        translate({left}cqw, {top}cqh) 
                        rotate({rotate}deg) 
                        translate({playing ? vectors[i].x : 0}cqw, {playing ? vectors[i].y : 0}cqh);
                "
				class={[
					'ease absolute top-0 left-0 w-max transition-transform duration-600 will-change-transform',
					playing && 'delay-300'
				]}
			>
				<Image
					collection="years"
					record_id={year.id}
					filename={year.poster}
					class={['h-[50cqh] w-auto object-contain!', playing ? 'shake' : '']}
					alt="poster-{year.id}"
					sizes="400x0,800x0,1200x0"
					nofade
				/>
			</div>
		{/each}
	</div>
{/if}

<button
	onclick={play}
	aria-label="Démarrer la vidéo"
	class={[
		'group ease absolute inset-0 flex cursor-pointer items-center justify-center transition duration-200 hover:bg-black/10',
		playing ? 'pointer-events-none opacity-0' : ''
	]}
>
	<div
		class={[
			'ease flex items-center justify-center rounded-full bg-foreground p-4 transition duration-200 group-hover:scale-95',
			playing && ' scale-0'
		]}
	>
		<div class="icon-[ri--play-fill] text-8xl text-background"></div>
	</div>
</button>
