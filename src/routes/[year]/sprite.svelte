<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import type { StudentsRecord } from '$lib/pocketbase.types';
	import { use_seed } from '$lib/store/seed-ctx.svelte';
	import { shuffle_array } from '$lib/utils/shuffle';

	const students: StudentsRecord[] = $derived(page.data.students);
	const seed = use_seed();
	const valid_students = $derived(students.filter((s) => Boolean(s.headshot)));
	const shuffled_students = $derived(shuffle_array<StudentsRecord>(valid_students, seed.value));

	// ── Config ────────────────────────────────────────────────────────────────
	const SPEED = 120;
	const ANGLE_DEG_MIN = 15;
	const ANGLE_DEG_MAX = 55;
	const SPAWN_INTERVAL_MS = 820;
	const IMG_H_RATIO = 0.5;
	const PRESEED_COUNT = 6;

	function rand(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	type BannerItem = {
		key: number;
		src: string;
		x_from: number;
		x_duration: number;
		img_h: number;
		// Vertical
		max_y: number;
		y_period: number; // full cycle duration (down + up), seconds
		y_delay: number; // negative seek into the cycle
	};

	let items = $state<BannerItem[]>([]);
	let keyCounter = 0;
	let queueIndex = 0;
	let containerW = 0;
	let containerH = 0;
	let spawnTimer: ReturnType<typeof setInterval> | null = null;

	const _dx_map = new Map<number, number>();

	// ── Spawn ─────────────────────────────────────────────────────────────────
	function spawnAt(xPx: number) {
		if (!shuffled_students.length) return;

		const student = shuffled_students[queueIndex % shuffled_students.length];
		queueIndex++;

		const angle = rand(ANGLE_DEG_MIN, ANGLE_DEG_MAX) * (Math.PI / 180);
		const dx = Math.cos(angle) * SPEED;
		const dy = Math.sin(angle) * SPEED;

		const img_h = containerH * IMG_H_RATIO;
		const max_y = containerH - img_h;

		// Full bounce cycle = down leg + up leg
		const y_half = max_y / dy; // seconds for one leg
		const y_period = y_half * 2; // full cycle for `alternate`

		// Random start position and direction
		const y_from = rand(0, max_y);
		const going_down = Math.random() < 0.5;

		// Map y_from + direction to a position within the full cycle [0, y_period]:
		// First half of cycle (t=0..y_half): going down  → y = (t/y_half) * max_y
		// Second half (t=y_half..y_period):  going up    → y = (1 - (t-y_half)/y_half) * max_y
		// Invert to find t from y_from:
		let t_in_cycle: number;
		if (going_down) {
			t_in_cycle = (y_from / max_y) * y_half; // 0..y_half
		} else {
			t_in_cycle = y_half + (1 - y_from / max_y) * y_half; // y_half..y_period
		}

		const y_delay = -t_in_cycle;
		const x_duration = (xPx + containerW) / dx;

		const key = keyCounter++;
		_dx_map.set(key, dx);

		items = [
			...items,
			{
				key,
				src: `${PUBLIC_POCKETBASE_URL}/api/files/students/${student.id}/${student.headshot}?format=webp&thumb=100x0`,
				x_from: xPx,
				x_duration,
				img_h,
				max_y,
				y_period,
				y_delay
			}
		];
	}

	function preseed() {
		if (!shuffled_students.length) return;
		for (let i = 0; i < PRESEED_COUNT; i++) {
			spawnAt(rand(0, containerW * 0.95));
		}
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────────
	function mount(node: HTMLDivElement) {
		containerW = node.clientWidth;
		containerH = node.clientHeight;
		preseed();
		spawnTimer = setInterval(() => spawnAt(containerW + 20), SPAWN_INTERVAL_MS);
		return {
			destroy() {
				if (spawnTimer) clearInterval(spawnTimer);
			}
		};
	}

	// ── Image load: correct x_duration + start animation ─────────────────────
	function onLoad(e: Event, key: number) {
		const img = e.currentTarget as HTMLImageElement;
		const outer = img.closest<HTMLDivElement>('.banner-item');
		if (!outer) return;

		const dx = _dx_map.get(key) ?? SPEED;
		const item = items.find((i) => i.key === key);
		if (!item) return;

		const img_w = (item.img_h / img.naturalHeight) * img.naturalWidth;
		const x_duration = (item.x_from + containerW + img_w) / dx;

		const x_progress =
			item.x_from < containerW ? (containerW - item.x_from) / (containerW + img_w) : 0;
		const x_delay = -(x_progress * x_duration);

		outer.style.setProperty('--x-to', `${-img_w}px`);
		outer.style.setProperty('--x-duration', `${x_duration}s`);
		outer.style.setProperty('--x-delay', `${x_delay}s`);
		outer.style.setProperty('--anim-state', 'running');
	}

	function onEnd(key: number) {
		_dx_map.delete(key);
		items = items.filter((i) => i.key !== key);
	}
</script>

<div use:mount class="relative -mx-gap h-64 overflow-hidden border-y">
	{#each items as item (item.key)}
		<div
			class="banner-item"
			style="
				--x-from:     {item.x_from}px;
				--x-to:       -9999px;
				--x-duration: {item.x_duration}s;
				--x-delay:    0s;
				--anim-state: paused;
			"
			onanimationend={() => onEnd(item.key)}
		>
			<div
				class="banner-item-inner"
				style="
					--max-y:    {item.max_y}px;
					--y-period: {item.y_period}s;
					--y-delay:  {item.y_delay}s;
				"
			>
				<img
					src={item.src}
					alt=""
					onload={(e) => onLoad(e, item.key)}
					style="height: {item.img_h}px; width: auto; display: block;"
					class="object-contain"
				/>
			</div>
		</div>
	{/each}
</div>

<style>
	@keyframes slide-x {
		from {
			transform: translateX(var(--x-from));
		}
		to {
			transform: translateX(var(--x-to));
		}
	}

	@keyframes bounce-y {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(var(--max-y));
		}
	}

	.banner-item {
		position: absolute;
		top: 0;
		left: 0;
		animation: slide-x var(--x-duration) var(--x-delay) linear 1 forwards;
		animation-play-state: var(--anim-state, paused);
	}

	.banner-item-inner {
		animation: bounce-y var(--y-period) var(--y-delay) linear infinite alternate;
	}
</style>
