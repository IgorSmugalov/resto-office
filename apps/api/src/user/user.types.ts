type ById = { id: string; email?: never }
type ByEmail = { id?: never; email: string }
export type GetUniqueInput = ById | ByEmail
