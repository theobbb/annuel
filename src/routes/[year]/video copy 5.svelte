<script lang="ts">
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';

	const { data } = $props();
	const { year } = $derived(data);

	let video: HTMLVideoElement | null = $state(null);
	let loading = $state(false);
	let posterRefs: HTMLDivElement[] = $state([]);
	let containerRef: HTMLDivElement | null = null;

	const SPEED = 0.05; // cqw/cqh per frame

	// [startX%, startY%, rotation, dirX, dirY]
	const posterConfigs: [number, number, number, number, number][] = [
		[5, 10, -30, 1, 1],
		[20, 5, 20, -1, 1],
		[50, 20, -5, 1, -1],
		[70, 15, 10, -1, -1]
	];

	type Vec2 = { x: number; y: number };
	type Phase = 'bouncing' | 'flying-out' | 'out' | 'flying-in';

	const bounceStates = posterConfigs.map(([x, y, , dx, dy]) => ({
		x,
		y,
		vx: dx * SPEED,
		vy: dy * SPEED
	}));

	let positions = $state<Vec2[]>(bounceStates.map((s) => ({ x: s.x, y: s.y })));
	let flyVectors = $state<Vec2[]>(posterConfigs.map(() => ({ x: 0, y: 0 })));
	let phase = $state<Phase>('bouncing');
	let playing = $state(false);

	let animFrame: number | null = null;
	let phaseTimeout: ReturnType<typeof setTimeout> | null = null;

	function tick() {
		const container = containerRef;
		if (!container) {
			animFrame = requestAnimationFrame(tick);
			return;
		}
		const cRect = container.getBoundingClientRect();

		for (let i = 0; i < bounceStates.length; i++) {
			const el = posterRefs[i];
			if (!el) continue;
			const r = el.getBoundingClientRect();
			const wPct = (r.width / cRect.width) * 100;
			const hPct = (r.height / cRect.height) * 100;
			const maxX = 100 - wPct;
			const maxY = 100 - hPct;

			let { x, y, vx, vy } = bounceStates[i];

			// Clamp into bounds first (handles initial out-of-bounds positions)
			x = Math.min(Math.max(x, 0), maxX);
			y = Math.min(Math.max(y, 0), maxY);

			x += vx;
			y += vy;

			if (x <= 0) {
				x = 0;
				vx = Math.abs(vx);
			}
			if (x >= maxX) {
				x = maxX;
				vx = -Math.abs(vx);
			}
			if (y <= 0) {
				y = 0;
				vy = Math.abs(vy);
			}
			if (y >= maxY) {
				y = maxY;
				vy = -Math.abs(vy);
			}

			bounceStates[i] = { x, y, vx, vy };
		}

		positions = bounceStates.map((s) => ({ x: s.x, y: s.y }));
		animFrame = requestAnimationFrame(tick);
	}

	function startBounce() {
		if (animFrame !== null) return;
		tick();
	}

	function stopBounce() {
		if (animFrame !== null) {
			cancelAnimationFrame(animFrame);
			animFrame = null;
		}
	}

	function computeFlyVectors(): Vec2[] {
		if (!containerRef) return posterConfigs.map(() => ({ x: 0, y: 0 }));
		const cRect = containerRef.getBoundingClientRect();
		return bounceStates.map((s, i) => {
			const el = posterRefs[i];
			if (!el) return { x: 0, y: 0 };
			const r = el.getBoundingClientRect();
			const cx = s.x + (r.width / cRect.width) * 50;
			const cy = s.y + (r.height / cRect.height) * 50;
			const dx = cx - 50,
				dy = cy - 50;
			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			return { x: (dx / len) * 130, y: (dy / len) * 130 };
		});
	}

	function play() {
		if (loading || phase !== 'bouncing') return;
		flyVectors = computeFlyVectors();
		stopBounce();
		phase = 'flying-out';
		playing = true;
		if (phaseTimeout) clearTimeout(phaseTimeout);
		phaseTimeout = setTimeout(() => {
			phase = 'out';
		}, 650);
		loading = true;
		video?.play().finally(() => {
			loading = false;
		});
	}

	function pause() {
		if (video?.seeking) return;
		video?.pause();
		playing = false;
		phase = 'flying-in';
		if (phaseTimeout) clearTimeout(phaseTimeout);
		phaseTimeout = setTimeout(() => {
			phase = 'bouncing';
			startBounce();
		}, 650);
	}

	function mountContainer(node: HTMLDivElement) {
		containerRef = node;
		startBounce();
		return {
			destroy() {
				stopBounce();
				if (phaseTimeout) clearTimeout(phaseTimeout);
			}
		};
	}
</script>

<Video
	bind:video
	autoplay={false}
	loop={false}
	controls={playing}
	onended={() => pause()}
	onpause={() => pause()}
	playback_id="14W025RvjQdhvGaDyE4jHmKtWzQcIyA5PJNtRl7dLbmA"
	class="h-full w-full"
/>

{#if year?.poster}
	<div
		use:mountContainer
		class={[
			'pointer-events-none absolute inset-0 overflow-hidden',
			phase === 'out' ? 'opacity-0' : 'opacity-100',
			'transition-opacity duration-300'
		]}
	>
		{#each posterConfigs as [, , rotate], i}
			{@const flown = phase === 'flying-out' || phase === 'out' || phase === 'flying-in'}
			<div
				bind:this={posterRefs[i]}
				style="
                    position: absolute; top: 0; left: 0;
                    transform:
                        translate({positions[i].x}cqw, {positions[i].y}cqh)
                        rotate({rotate}deg)
                        translate({flown ? flyVectors[i].x : 0}cqw, {flown
					? flyVectors[i].y
					: 0}cqh);
                    transition: {phase === 'flying-out' || phase === 'flying-in'
					? 'transform 600ms ease'
					: 'none'};
                "
				class="absolute w-max will-change-transform"
			>
				<Image
					collection="years"
					record_id={year.id}
					filename={year.poster}
					class="h-[30cqh] w-auto object-contain!"
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
