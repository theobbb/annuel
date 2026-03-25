import { getContext, setContext } from 'svelte';

class Seed {
	value: number = $state(-1);

	constructor(value: number) {
		this.value = value;
	}
	shuffle() {
		this.value = Math.random();
		console.log(this.value);
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
