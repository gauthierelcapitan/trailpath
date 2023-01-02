import { environmentDatabaseSchema } from '@trailpath/api/environments/interface/environment-database.interface';
import { z } from 'zod';

export const environmentSchema = z.object({
  production: z.boolean(),
  port: z.number(),
  baseUrl: z.string(),
  globalApiPrefix: z.string(),
  database: environmentDatabaseSchema,
});

export type EnvironmentInterface = z.infer<typeof environmentSchema>;
