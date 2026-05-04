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

	// ── Config ───────────────────────────────────────────────────────────────
	const SPEED = 60; // px per second — tweak this only
	const ANGLE_DEG_MIN = 15;
	const ANGLE_DEG_MAX = 55;
	const SPAWN_INTERVAL_MS = 820;
	const IMG_H_RATIO = 0.5;
	const PRESEED_COUNT = 6;

	function rand(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	type Physics = {
		x: number;
		y: number;
		dx: number;
		dy: number; // unit direction * SPEED (px/s)
		w: number;
		h: number;
	};

	type BannerItem = { key: number; id: string; src: string };

	let renderItems = $state<BannerItem[]>([]);
	const physics = new Map<number, Physics>();
	const imgRefs = new Map<number, HTMLImageElement>();

	let keyCounter = 0;
	let queueIndex = 0;
	let containerW = 0;
	let containerH = 0;
	let animFrame: number | null = null;
	let spawnTimer: ReturnType<typeof setInterval> | null = null;
	let lastTime: number | null = null; // ← for delta time

	// ── Helpers ───────────────────────────────────────────────────────────────
	function makeVelocity() {
		const angle = rand(ANGLE_DEG_MIN, ANGLE_DEG_MAX) * (Math.PI / 180);
		const sign = Math.random() < 0.5 ? 1 : -1;
		return {
			dx: Math.cos(angle) * SPEED,
			dy: Math.sin(angle) * SPEED * sign
		};
	}

	function resolveWidth(img: HTMLImageElement, h: number): number {
		if (img.naturalWidth && img.naturalHeight) {
			return (h / img.naturalHeight) * img.naturalWidth;
		}
		return 0;
	}

	function spawnAt(xPx: number) {
		if (!shuffled_students.length) return;

		const student = shuffled_students[queueIndex % shuffled_students.length];
		queueIndex++;

		const h = containerH * IMG_H_RATIO;
		const y = rand(0, containerH - h);
		const { dx, dy } = makeVelocity();
		const key = keyCounter++;

		physics.set(key, { x: xPx, y, dx, dy, w: 0, h });
		renderItems = [
			...renderItems,
			{
				key,
				id: student.id,
				src: `${PUBLIC_POCKETBASE_URL}/api/files/students/${student.id}/${student.headshot}?format=webp&thumb=100x0`
			}
		];
	}

	function preseed() {
		if (!shuffled_students.length) return;
		for (let i = 0; i < PRESEED_COUNT; i++) {
			spawnAt(rand(0, containerW * 0.9));
		}
	}

	// ── Tick — delta-time scaled ──────────────────────────────────────────────
	function tick(now: DOMHighResTimeStamp) {
		// Cap dt to 100ms so a backgrounded tab resuming doesn't teleport items
		const dt = Math.min(lastTime === null ? 0 : now - lastTime, 100) / 1000;
		lastTime = now;

		const toRemove: number[] = [];

		for (const [key, p] of physics) {
			if (p.w === 0) continue;

			p.x -= p.dx * dt;
			p.y += p.dy * dt;

			const maxY = containerH - p.h;
			if (p.y <= 0) {
				p.y = 0;
				p.dy = Math.abs(p.dy);
			}
			if (p.y >= maxY) {
				p.y = maxY;
				p.dy = -Math.abs(p.dy);
			}

			if (p.x + p.w < 0) {
				toRemove.push(key);
				continue;
			}

			const el = imgRefs.get(key);
			if (el) el.style.transform = `translate(${p.x}px, ${p.y}px)`;
		}

		if (toRemove.length) {
			for (const key of toRemove) {
				physics.delete(key);
				imgRefs.delete(key);
			}
			renderItems = renderItems.filter((i) => !toRemove.includes(i.key));
		}

		animFrame = requestAnimationFrame(tick);
	}

	// ── Lifecycle ─────────────────────────────────────────────────────────────
	function mount(node: HTMLDivElement) {
		containerW = node.clientWidth;
		containerH = node.clientHeight;

		preseed();
		spawnTimer = setInterval(() => spawnAt(containerW + 20), SPAWN_INTERVAL_MS);
		animFrame = requestAnimationFrame(tick);

		return {
			destroy() {
				if (animFrame) cancelAnimationFrame(animFrame);
				if (spawnTimer) clearInterval(spawnTimer);
			}
		};
	}

	// ── Image binding ─────────────────────────────────────────────────────────
	function bindImg(node: HTMLImageElement, key: number) {
		imgRefs.set(key, node);

		function applySize() {
			const p = physics.get(key);
			if (!p) return;
			p.w = resolveWidth(node, p.h);
			node.style.transform = `translate(${p.x}px, ${p.y}px)`;
		}

		if (node.complete && node.naturalWidth) {
			applySize();
		} else {
			node.addEventListener('load', applySize, { once: true });
		}

		return {
			destroy() {
				imgRefs.delete(key);
			}
		};
	}
</script>

<div use:mount class="relative -mx-gap h-84 overflow-hidden">
	{#each renderItems as item (item.key)}
		<img
			use:bindImg={item.key}
			src={item.src}
			alt=""
			style="position: absolute; top: 0; left: 0; height: {IMG_H_RATIO *
				100}%; width: auto; will-change: transform;"
			class="object-contain"
		/>
	{/each}
</div>
