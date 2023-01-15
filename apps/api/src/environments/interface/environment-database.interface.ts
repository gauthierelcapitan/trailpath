import { z } from 'zod';

export const environmentDatabaseSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  username: z.string(),
  password: z.string(),
});

export type EnvironmentDatabaseInterface = z.infer<typeof environmentDatabaseSchema>;
