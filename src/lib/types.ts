import type { ProgramsRecord, ProjectsRecord, StudentsRecord } from './pocketbase.types';

export interface PaginationResult<T> {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
	items: T[];
}

export type StudentsRecordExpanded = StudentsRecord & {
	expand: {
		program: ProgramsRecord;
		'projects(student)': ProjectsRecord[];
	};
};
