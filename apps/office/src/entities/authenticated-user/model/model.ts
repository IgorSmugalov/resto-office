import { UserResponse } from '@libs/schema'
import { createDomain } from 'effector'

export const authUser = createDomain()
export const $authUser = authUser.createStore<UserResponse | null>(null)
