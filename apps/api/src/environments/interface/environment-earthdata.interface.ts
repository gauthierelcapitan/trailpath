import { z } from 'zod';

export const environmentEarthdataSchema = z.object({
  username: z.string(),
  password: z.string(),
  tilesDirectory: z.string(),
});

export type EnvironmentEarthdataInterface = z.infer<
  typeof environmentEarthdataSchema
>;
