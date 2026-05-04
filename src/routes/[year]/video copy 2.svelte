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
	let containerRef: HTMLDivElement | null = $state(null);

	const posterConfigs = [
		[-10, 20, -30],
		[15, -5, 20],
		[50, 20, -5],
		[80, -20, 10]
	];

	// DVD bounce state: position in % of container, velocity in %/frame
	type BounceState = {
		x: number;
		y: number;
		vx: number;
		vy: number;
	};

	let bounceStates = $state<BounceState[]>(
		posterConfigs.map(([left, top]) => ({
			x: left,
			y: top,
			vx: (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? 1 : -1),
			vy: (Math.random() * 0.3 + 0.15) * (Math.random() < 0.5 ? 1 : -1)
		}))
	);

	// Fly-out vectors used when play is clicked
	let vectors = $state(posterConfigs.map(() => ({ x: 0, y: 0 })));

	let animFrame: number | null = null;

	function startBounce() {
		if (animFrame !== null) return;

		function step() {
			if (!containerRef) {
				animFrame = requestAnimationFrame(step);
				return;
			}
			const containerRect = containerRef.getBoundingClientRect();

			bounceStates = bounceStates.map((state, i) => {
				const el = posterRefs[i];
				if (!el) return state;
				const rect = el.getBoundingClientRect();

				// Poster size as % of container
				const wPct = (rect.width / containerRect.width) * 100;
				const hPct = (rect.height / containerRect.height) * 100;

				let { x, y, vx, vy } = state;
				x += vx;
				y += vy;

				// Bounce off edges (x: 0..100-wPct, y: 0..100-hPct)
				if (x <= 0) {
					x = 0;
					vx = Math.abs(vx);
				}
				if (x >= 100 - wPct) {
					x = 100 - wPct;
					vx = -Math.abs(vx);
				}
				if (y <= 0) {
					y = 0;
					vy = Math.abs(vy);
				}
				if (y >= 100 - hPct) {
					y = 100 - hPct;
					vy = -Math.abs(vy);
				}

				return { x, y, vx, vy };
			});

			animFrame = requestAnimationFrame(step);
		}

		animFrame = requestAnimationFrame(step);
	}

	function stopBounce() {
		if (animFrame !== null) {
			cancelAnimationFrame(animFrame);
			animFrame = null;
		}
	}

	$effect(() => {
		if (!playing) {
			startBounce();
		} else {
			stopBounce();
		}
		return () => stopBounce();
	});

	function play() {
		if (loading) return;

		// Calculate fly-out vectors from current bounce positions
		vectors = posterConfigs.map((_, i) => {
			const el = posterRefs[i];
			if (!el || !containerRef) return { x: 0, y: 0 };
			const rect = el.getBoundingClientRect();
			const containerRect = containerRef.getBoundingClientRect();

			const wPct = (rect.width / containerRect.width) * 100;
			const hPct = (rect.height / containerRect.height) * 100;
			const centerX = bounceStates[i].x + wPct / 2;
			const centerY = bounceStates[i].y + hPct / 2;
			const dx = centerX - 50;
			const dy = centerY - 50;
			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			const distance = 80;
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
		bind:this={containerRef}
		class={[
			'pointer-events-none absolute inset-0 flex overflow-hidden',
			playing && 'opacity-0 transition-opacity delay-600 duration-500'
		]}
	>
		{#each posterConfigs as [_left, _top, rotate], i}
			<div
				bind:this={posterRefs[i]}
				style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform:
                        translate({playing ? bounceStates[i].x : bounceStates[i].x}cqw, {playing
					? bounceStates[i].y
					: bounceStates[i].y}cqh)
                        rotate({rotate}deg)
                        {playing ? `translate(${vectors[i].x}cqw, ${vectors[i].y}cqh)` : ''};
                    {playing ? 'transition: transform 600ms ease 300ms;' : ''}
                "
				class="w-max will-change-transform"
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
			playing && 'scale-0'
		]}
	>
		<div class="icon-[ri--play-fill] text-8xl text-background"></div>
	</div>
</button>
