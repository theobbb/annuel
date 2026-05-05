import { getContext, setContext } from 'svelte';

class Seed {
	value: number = $state(-1);
	projects: string[] = $state([]);

	constructor(value: number) {
		this.value = value;
	}
	shuffle() {
		this.value = Math.random();
	}
	set_projects(ids: string[]) {
		// Only update if order actually changed
		if (ids.length !== this.projects.length || ids.some((id, i) => id !== this.projects[i])) {
			this.projects = ids;
		}
	}
}

const SEED = Symbol('SEED');

export function init_seed(value: number) {
	return setContext(SEED, new Seed(value));
}

export function use_seed() {
	const ctx = getContext<Seed>(SEED);
	if (!ctx) throw new Error('SEED not initialized');
	return ctx;
}
