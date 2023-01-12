import { environmentDatabaseSchema } from '@trailpath/api/environments/interface/environment-database.interface';
import { z } from 'zod';
import {
  environmentEarthdataSchema
} from '@trailpath/api/environments/interface/environment-earthdata.interface';

export const environmentSchema = z.object({
  production: z.boolean(),
  port: z.number(),
  baseUrl: z.string(),
  globalApiPrefix: z.string(),
  database: environmentDatabaseSchema,
  earthdata: environmentEarthdataSchema,
});

export type EnvironmentInterface = z.infer<typeof environmentSchema>;
