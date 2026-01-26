// comments-service.svelte.ts
import { page } from '$app/state';
import { pocketbase } from '$lib/pocketbase';
import type { ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import type { AnchorPosition } from '$lib/utils/anchor';
import { getContext, setContext } from 'svelte';

export class StoreStudentProjects {
	current: { student: StudentsRecord; anchor: AnchorPosition; context_key: string | null } | null =
		$state(null);
	cache = $state<Record<string, ProjectsRecord[]>>({});
	// Track in-flight promises to prevent duplicate fetches
	#loading = new Map<string, Promise<ProjectsRecord[]>>();

	year = $derived(page.params.year);

	async get_projects(id: string): Promise<ProjectsRecord[]> {
		// 1. Check Cache
		if (this.cache[id]) return this.cache[id];

		// 2. Check if already fetching
		const in_flight = this.#loading.get(id);
		if (in_flight) return in_flight;

		// 3. Fetch
		const fetchTask = (async () => {
			try {
				// Filter syntax: find projects where studentId is in the 'students' array
				const projects: ProjectsRecord[] = await pocketbase.collection('projects').getFullList({
					filter: `year = "${this.year}" && students ?~ "${id}"`,
					fields: 'id,files,name'
				});

				this.cache[id] = projects;
				return projects;
			} catch (err) {
				console.error(`Failed to fetch projects for student ${id}:`, err);
				return [];
			} finally {
				this.#loading.delete(id);
			}
		})();

		this.#loading.set(id, fetchTask);
		return fetchTask;
	}
}

const STORE_STUDENT_PROJECTS = Symbol('STORE_STUDENT_PROJECTS');

export function init_store_student_projects() {
	return setContext(STORE_STUDENT_PROJECTS, new StoreStudentProjects());
}

export function use_store_student_projects() {
	const store = getContext<StoreStudentProjects>(STORE_STUDENT_PROJECTS);
	if (!store) throw new Error('STORE_STUDENT_PROJECTS not initialized');
	return store;
}
