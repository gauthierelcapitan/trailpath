import { z } from 'zod';

export const createTrackResponseSchema = z.object({
  uuid: z.string().describe('The UUID of the Track.'),
});

export type CreateTrackResponseInterface = z.infer<
  typeof createTrackResponseSchema
>;
