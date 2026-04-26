/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	PasskeyInvites = "_passkey_invites",
	Passkeys = "_passkeys",
	Superusers = "_superusers",
	Globals = "globals",
	MemberRoles = "member_roles",
	Members = "members",
	ProgramStats = "program_stats",
	ProgramTypes = "program_types",
	Programs = "programs",
	ProjectFiles = "project_files",
	Projects = "projects",
	Socials = "socials",
	Sponsors = "sponsors",
	Students = "students",
	Users = "users",
	Years = "years",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type PasskeyInvitesRecord = {
	created: IsoAutoDateString
	id: string
	updated: IsoAutoDateString
	user: RecordIdString
}

export type PasskeysRecord = {
	algorithm: string
	created: IsoAutoDateString
	credential_id: string
	id: string
	public_key: string
	updated: IsoAutoDateString
	user: RecordIdString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type GlobalsRecord<Tbanner = unknown> = {
	banner?: null | Tbanner
	created: IsoAutoDateString
	id: string
	introduction: string
	updated: IsoAutoDateString
}

export type MemberRolesRecord = {
	created: IsoAutoDateString
	id: string
	name: string
	sort_order?: number
	updated: IsoAutoDateString
}

export type MembersRecord = {
	created: IsoAutoDateString
	id: string
	name: string
	role: RecordIdString
	student?: RecordIdString
	updated: IsoAutoDateString
	year: RecordIdString
}

export type ProgramStatsRecord<Tproject_count = unknown, Tstudent_count = unknown> = {
	id: string
	program?: RecordIdString
	project_count?: null | Tproject_count
	student_count?: null | Tstudent_count
	year?: RecordIdString
}

export type ProgramTypesRecord = {
	created: IsoAutoDateString
	id: string
	name: string
	sort_order?: number
	updated: IsoAutoDateString
}

export type ProgramsRecord = {
	code: string
	created: IsoAutoDateString
	description: string
	id: string
	name: string
	type: RecordIdString
	updated: IsoAutoDateString
}

export type ProjectFilesRecord = {
	caption?: string
	col_span?: number
	col_start?: number
	created: IsoAutoDateString
	file: FileNameString
	id: string
	sort_order?: number
	updated: IsoAutoDateString
}

export type ProjectsRecord<Tmeta_files = unknown> = {
	background?: string
	class?: string
	created: IsoAutoDateString
	description?: string
	draft?: boolean
	draft_of?: RecordIdString
	draft_version?: number
	files?: FileNameString[]
	foreground_white?: boolean
	id: string
	is_latest?: boolean
	meta_files?: null | Tmeta_files
	name: string
	session?: string
	students: RecordIdString[]
	teacher?: string
	thumbnail?: FileNameString
	updated: IsoAutoDateString
	year: RecordIdString
}

export type SocialsRecord = {
	created: IsoAutoDateString
	id: string
	name: string
	sort_order?: number
	updated: IsoAutoDateString
	url: string
}

export type SponsorsRecord = {
	created: IsoAutoDateString
	id: string
	logo: FileNameString
	name: string
	size?: number
	sort_order?: number
	updated: IsoAutoDateString
	url?: string
	year: RecordIdString
}

export type StudentsRecord<Tsocials = unknown, Tsort_projects = unknown> = {
	created: IsoAutoDateString
	description?: string
	draft?: boolean
	draft_of?: RecordIdString
	email?: string
	first_name: string
	headshot?: FileNameString
	id: string
	is_latest?: boolean
	last_name: string
	program?: RecordIdString
	pronouns?: string
	socials?: null | Tsocials
	sort_projects?: null | Tsort_projects
	updated: IsoAutoDateString
	year: RecordIdString
}

export type UsersRecord = {
	created: IsoAutoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name: string
	password: string
	role?: number
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type YearsRecord = {
	accent_color?: string
	created: IsoAutoDateString
	draft?: boolean
	id: string
	poster?: FileNameString
	updated: IsoAutoDateString
	video?: FileNameString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type PasskeyInvitesResponse<Texpand = unknown> = Required<PasskeyInvitesRecord> & BaseSystemFields<Texpand>
export type PasskeysResponse<Texpand = unknown> = Required<PasskeysRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type GlobalsResponse<Tbanner = unknown, Texpand = unknown> = Required<GlobalsRecord<Tbanner>> & BaseSystemFields<Texpand>
export type MemberRolesResponse<Texpand = unknown> = Required<MemberRolesRecord> & BaseSystemFields<Texpand>
export type MembersResponse<Texpand = unknown> = Required<MembersRecord> & BaseSystemFields<Texpand>
export type ProgramStatsResponse<Tproject_count = unknown, Tstudent_count = unknown, Texpand = unknown> = Required<ProgramStatsRecord<Tproject_count, Tstudent_count>> & BaseSystemFields<Texpand>
export type ProgramTypesResponse<Texpand = unknown> = Required<ProgramTypesRecord> & BaseSystemFields<Texpand>
export type ProgramsResponse<Texpand = unknown> = Required<ProgramsRecord> & BaseSystemFields<Texpand>
export type ProjectFilesResponse<Texpand = unknown> = Required<ProjectFilesRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Tmeta_files = unknown, Texpand = unknown> = Required<ProjectsRecord<Tmeta_files>> & BaseSystemFields<Texpand>
export type SocialsResponse<Texpand = unknown> = Required<SocialsRecord> & BaseSystemFields<Texpand>
export type SponsorsResponse<Texpand = unknown> = Required<SponsorsRecord> & BaseSystemFields<Texpand>
export type StudentsResponse<Tsocials = unknown, Tsort_projects = unknown, Texpand = unknown> = Required<StudentsRecord<Tsocials, Tsort_projects>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type YearsResponse<Texpand = unknown> = Required<YearsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_passkey_invites: PasskeyInvitesRecord
	_passkeys: PasskeysRecord
	_superusers: SuperusersRecord
	globals: GlobalsRecord
	member_roles: MemberRolesRecord
	members: MembersRecord
	program_stats: ProgramStatsRecord
	program_types: ProgramTypesRecord
	programs: ProgramsRecord
	project_files: ProjectFilesRecord
	projects: ProjectsRecord
	socials: SocialsRecord
	sponsors: SponsorsRecord
	students: StudentsRecord
	users: UsersRecord
	years: YearsRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_passkey_invites: PasskeyInvitesResponse
	_passkeys: PasskeysResponse
	_superusers: SuperusersResponse
	globals: GlobalsResponse
	member_roles: MemberRolesResponse
	members: MembersResponse
	program_stats: ProgramStatsResponse
	program_types: ProgramTypesResponse
	programs: ProgramsResponse
	project_files: ProjectFilesResponse
	projects: ProjectsResponse
	socials: SocialsResponse
	sponsors: SponsorsResponse
	students: StudentsResponse
	users: UsersResponse
	years: YearsResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
