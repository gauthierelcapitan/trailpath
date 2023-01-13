import { environmentDatabaseSchema } from '@trailpath/api/environments/interface/environment-database.interface';
import { environmentEarthdataSchema } from '@trailpath/api/environments/interface/environment-earthdata.interface';
import { environmentGeonamesSchema } from '@trailpath/api/environments/interface/environment-geonames.interface';
import { z } from 'zod';

export const environmentSchema = z.object({
  production: z.boolean(),
  port: z.number(),
  baseUrl: z.string(),
  globalApiPrefix: z.string(),
  database: environmentDatabaseSchema,
  earthdata: environmentEarthdataSchema,
  geonames: environmentGeonamesSchema,
});

export type EnvironmentInterface = z.infer<typeof environmentSchema>;
