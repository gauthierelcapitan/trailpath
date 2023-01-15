import { z } from 'zod';

export const environmentGeonamesSchema = z.object({
  username: z.string(),
});

export type EnvironmentGeonamesInterface = z.infer<typeof environmentGeonamesSchema>;
