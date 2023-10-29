/* eslint-disable  @typescript-eslint/no-explicit-any */

import { createEffect } from 'effector'
import { ZodError, ZodSchema } from 'zod'

interface ValidateProps {
  schema: ZodSchema
  object: object
}

export const validateFormFx = createEffect<ValidateProps, any, ZodError>(
  async ({ schema, object }) => {
    return await schema.parseAsync(object)
  }
)
