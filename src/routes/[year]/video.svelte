<script lang="ts">
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Image from '$lib/ui/components/media/image.svelte';
	import Video from '$lib/ui/components/media/video.svelte';

	const { data } = $props();
	const { year } = $derived(data);

	let video: HTMLVideoElement | null = $state(null);
	let loading = $state(false);

	let hovered = $state(false);

	// Inner refs — unrotated image elements for accurate size measurement
	let imageRefs: HTMLDivElement[] = $state([]);
	let containerRef: HTMLDivElement | null = null;

	const SPEED = 0.01;
	const FADE_OUT_DISTANCE = 50;

	// [startX%, startY%, rotationDeg, dirX, dirY]
	const posterConfigs: [number, number, number, number, number][] = [
		[15, 30, -30, 1, 1],
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

	// Returns the % footprint of a rotated rect in container space
	function rotatedFootprint(
		wPct: number,
		hPct: number,
		angleDeg: number
	): { w: number; h: number } {
		const a = (angleDeg * Math.PI) / 180;
		const cos = Math.abs(Math.cos(a));
		const sin = Math.abs(Math.sin(a));
		return {
			w: wPct * cos + hPct * sin,
			h: wPct * sin + hPct * cos
		};
	}

	function tick() {
		const container = containerRef;
		if (!container) {
			animFrame = requestAnimationFrame(tick);
			return;
		}
		const cRect = container.getBoundingClientRect();

		for (let i = 0; i < bounceStates.length; i++) {
			const el = imageRefs[i];
			if (!el) continue;

			// 1. Use offsetWidth/Height to get the UNROTATED dimensions
			const wPct = (el.offsetWidth / cRect.width) * 100;
			const hPct = (el.offsetHeight / cRect.height) * 100;

			const [, , rotate] = posterConfigs[i];

			// 2. Calculate the actual footprint
			const { w: fw, h: fh } = rotatedFootprint(wPct, hPct, rotate);

			// 3. Shift the min/max bounds based on the difference between the rotated
			// footprint and the unrotated footprint, split evenly (since it rotates from the center)
			const minX = (fw - wPct) / 2;
			const maxX = 100 - (fw + wPct) / 2;

			const minY = (fh - hPct) / 2;
			const maxY = 100 - (fh + hPct) / 2;

			let { x, y, vx, vy } = bounceStates[i];

			x += vx;
			y += vy;

			// 4. Check boundaries against the offset min/max
			if (x <= minX) {
				x = minX;
				vx = Math.abs(vx);
			} else if (x >= maxX) {
				x = maxX;
				vx = -Math.abs(vx);
			}

			if (y <= minY) {
				y = minY;
				vy = Math.abs(vy);
			} else if (y >= maxY) {
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
			const el = imageRefs[i];
			if (!el) return { x: 0, y: 0 };

			// Use unrotated dimensions
			const wPct = (el.offsetWidth / cRect.width) * 100;
			const hPct = (el.offsetHeight / cRect.height) * 100;

			// The center coordinate doesn't change when rotated from the center!
			const cx = s.x + wPct / 2;
			const cy = s.y + hPct / 2;

			const dx = cx - 50;
			const dy = cy - 50;

			const len = Math.sqrt(dx * dx + dy * dy) || 1;
			return { x: (dx / len) * FADE_OUT_DISTANCE, y: (dy / len) * FADE_OUT_DISTANCE };
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
		}, 50);
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
	class={[
		'h-full w-full max-lg:border-y lg:border',
		playing ? 'border-transparent' : '',
		'ease transition duration-200'
	]}
/>

{#if year?.poster}
	<!-- Outer: fade in/out -->
	<div
		use:mountContainer
		style="container-type: size;"
		class={[
			'pointer-events-none absolute inset-[-20%] overflow-hidden ',
			'transition-opacity duration-300',
			phase === 'out' ? 'opacity-0' : 'opacity-100'
		]}
	>
		{#each posterConfigs as [, , rotate], i}
			<!-- Bounce container: handles position + fly vector -->
			<div
				style="position: absolute; top: 0; left: 0; 
				translate: {positions[i].x}cqw {positions[i].y}cqh;"
				class={[
					'will-change-transform',
					(phase === 'flying-out' || phase === 'flying-in') && 'ease transition duration-600'
				]}
			>
				<!-- Fly container: handles fly offset -->
				<div
					style="
                        translate: {phase === 'flying-out' ||
					phase === 'out' ||
					phase === 'flying-in'
						? `${flyVectors[i].x}cqw ${flyVectors[i].y}cqh`
						: '0 0'};
                    
                    "
					class={[hovered ? 'shake' : '', 'ease transition duration-600']}
				>
					<!-- Rotate container: static rotation, also the ref for size measurement -->
					<div bind:this={imageRefs[i]} style="rotate: {rotate}deg;" class="w-max">
						<img
							class="h-[60cqh] w-auto border bg-white"
							src="{PUBLIC_POCKETBASE_URL}/api/files/years/{year.id}/{year.posters_0[i]}"
							alt="poster {year.id} {i}"
							style=""
						/>
						<!-- <Image
							collection="years"
							record_id={year.id}
							filename={year.poster}
							class="h-[60cqh] w-auto object-contain!"
							alt="poster-{year.id}"
							sizes="400x0"
							nofade
						/> -->
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<button
	onclick={play}
	onmouseenter={() => {
		hovered = true;
		stopBounce();
	}}
	onmouseleave={() => {
		hovered = false;
		if (phase === 'bouncing') startBounce();
	}}
	aria-label="Démarrer la vidéo"
	class={[
		'group ease @container  absolute inset-0 flex cursor-pointer items-center justify-center transition duration-200 hover:bg-black/10',
		playing ? 'pointer-events-none opacity-0' : ''
	]}
>
	<div
		class={[
			'ease flex items-center justify-center rounded-full bg-foreground p-[1cqw] transition duration-200 group-hover:scale-95',
			playing && 'scale-0'
		]}
	>
		<div class="icon-[ri--play-fill] text-[10cqw] text-background"></div>
	</div>
</button>
