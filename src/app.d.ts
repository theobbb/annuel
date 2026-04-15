// See https://svelte.dev/docs/kit/types#app.d.ts

import type {
	ProgramsRecord,
	ProgramStatsRecord,
	ProgramTypesRecord,
	YearsRecord
} from '$lib/pocketbase.types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			background: string;
		}
		interface PageData {
			programs: ProgramsRecord[];
			program_types: ProgramTypesRecord[];
			program_map: Map<string, ProgramsRecord>;
			program_type_map: Map<string, ProgramTypesRecord>;
			program_stats: Map<string, ProgramStatsRecord>;
			years: YearsRecord[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
