import { z } from 'zod';

export const getTrackResponseSchema = z.object({
  uuid: z.string().describe('The UUID of the Track.'),
});

export type GetTrackResponseInterface = z.infer<typeof getTrackResponseSchema>;
