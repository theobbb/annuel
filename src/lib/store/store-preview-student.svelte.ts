// comments-service.svelte.ts
import { pocketbase } from '$lib/pocketbase';
import type { ProgramsRecord, ProjectsRecord, StudentsRecord } from '$lib/pocketbase.types';
import { getContext, setContext } from 'svelte';

export type StoreStudent = StudentsRecord & {
	expand: { program: ProgramsRecord; 'projects(student)': ProjectsRecord[] };
};

export async function load_student(id: string): Promise<StoreStudent> {
	const record: StoreStudent = await pocketbase
		.collection('students')
		.getOne(id, { expand: 'program,projects(student)' });
	return record;
}

export class StoreStudents {
	cache = $state<Record<string, StoreStudent>>({});

	async get_student(id: string) {
		const exists = this.cache[id];
		if (exists) return exists;

		const student = await load_student(id);

		this.cache[id] = student;
		return student;
	}
}

const STORE_STUDENTS = Symbol('STORE_STUDENTS');

export function init_store_students() {
	return setContext(STORE_STUDENTS, new StoreStudents());
}

export function use_store_students() {
	const store = getContext<StoreStudents>(STORE_STUDENTS);
	if (!store) throw new Error('STORE_STUDENTS not initialized');
	return store;
}
