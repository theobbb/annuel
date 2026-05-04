<script lang="ts">
	import { dev } from '$app/environment';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';
	const { data } = $props();
	const { year } = $derived(data);

	// ─── Tweak these ───────────────────────────────────────────────
	const BOUNCE_CONFIG = {
		speed: 0.04, // base velocity in cq%/frame
		speedVariation: 0.01, // random ± added to each poster's speed
		drift: 0.0, // random nudge per frame (0 = perfectly linear)
		flyOutDistance: 80, // how far posters fly on play (cq%)
		flyOutDuration: 600, // CSS transition duration on fly-out (ms)
		flyOutDelay: 300, // CSS transition delay on fly-out (ms)
		fadeOutDuration: 500, // opacity transition duration on play (ms)
		fadeOutDelay: 600, // delay before fade starts (ms)
		posterHeight: 30, // poster height in cqh units
		shakeOnPlay: true // add shake animation class when video plays
	};
	// ───────────────────────────────────────────────────────────────

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

	type BounceState = { x: number; y: number; vx: number; vy: number };

	function makeInitialState([left, top]: number[]): BounceState {
		const { speed, speedVariation } = BOUNCE_CONFIG;
		const s = speed + (Math.random() * 2 - 1) * speedVariation;
		return {
			x: left,
			y: top,
			vx: s * (Math.random() < 0.5 ? 1 : -1),
			vy: s * (Math.random() < 0.5 ? 1 : -1)
		};
	}

	let bounceStates = $state<BounceState[]>(posterConfigs.map(makeInitialState));
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
				const wPct = (rect.width / containerRect.width) * 100;
				const hPct = (rect.height / containerRect.height) * 100;

				let { x, y, vx, vy } = state;

				// Optional random drift
				if (BOUNCE_CONFIG.drift > 0) {
					vx += (Math.random() * 2 - 1) * BOUNCE_CONFIG.drift;
					vy += (Math.random() * 2 - 1) * BOUNCE_CONFIG.drift;
					// Clamp so drift doesn't snowball
					const maxSpeed = BOUNCE_CONFIG.speed;
					const len = Math.sqrt(vx * vx + vy * vy);
					if (len > maxSpeed) {
						vx = (vx / len) * maxSpeed;
						vy = (vy / len) * maxSpeed;
					}
				}

				x += vx;
				y += vy;

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
		if (!playing) startBounce();
		else stopBounce();
		return () => stopBounce();
	});

	function play() {
		if (loading) return;
		const { flyOutDistance } = BOUNCE_CONFIG;
		vectors = posterConfigs.map((_, i) => {
			const el = posterRefs[i];
			if (!el || !containerRef) return { x: 0, y: 0 };
			const rect = el.getBoundingClientRect();
			const containerRect = containerRef.getBoundingClientRect();
			const wPct = (rect.width / containerRect.width) * 100;
			const hPct = (rect.height / containerRect.height) * 100;
			const cx = bounceStates[i].x + wPct / 2;
			const cy = bounceStates[i].y + hPct / 2;
			const dx = cx - 50;
			const dy = cy - 50;
			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			return { x: (dx / len) * flyOutDistance, y: (dy / len) * flyOutDistance };
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
		style="transition: opacity {BOUNCE_CONFIG.fadeOutDuration}ms ease {BOUNCE_CONFIG.fadeOutDelay}ms"
		class={['pointer-events-none absolute inset-0 overflow-hidden', playing && 'opacity-0']}
	>
		{#each posterConfigs as [_l, _t, rotate], i}
			<div
				bind:this={posterRefs[i]}
				style="
                    position: absolute; top: 0; left: 0;
                    transform:
                        translate({bounceStates[i].x}cqw, {bounceStates[i].y}cqh)
                        rotate({rotate}deg)
                        {playing ? `translate(${vectors[i].x}cqw, ${vectors[i].y}cqh)` : ''};
                    {playing
					? `transition: transform ${BOUNCE_CONFIG.flyOutDuration}ms ease ${BOUNCE_CONFIG.flyOutDelay}ms;`
					: ''}
                "
				class="w-max will-change-transform"
			>
				<Image
					collection="years"
					record_id={year.id}
					filename={year.poster}
					class={[
						`h-[${BOUNCE_CONFIG.posterHeight}cqh] w-auto object-contain!`,
						BOUNCE_CONFIG.shakeOnPlay && playing ? 'shake' : ''
					]}
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
