// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ProgramsRecord, YearsRecord } from '$lib/pocketbase.types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			background: string;
		}
		interface PageData {
			programs: ProgramsRecord[];
			program_map: Map<string, ProgramsRecord>;
			years: YearsRecord[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
