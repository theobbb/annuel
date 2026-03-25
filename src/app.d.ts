// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ProgramsRecord } from '$lib/pocketbase.types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			programs: ProgramsRecord[];
			program_map: Map<string, ProgramsRecord>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
