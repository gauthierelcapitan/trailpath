import { ElevationDatasourceEnum } from '@trailpath/api-interface/elevation/elevation-datasource.enum';
import { ElevationMethodEnum } from '@trailpath/api-interface/elevation/elevation-method.enum';
import { GpxDistanceMethodEnum } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum } from '@trailpath/gpx-resample';
import { z } from 'zod';

export const createTrackDtoSchema = z.object({
  distanceMethod: z
    .nativeEnum(GpxDistanceMethodEnum)
    .describe(
      'The method used for calculating distance between two GPS coordinates.',
    ),
  resampleMethod: z
    .nativeEnum(GpxResampleMethodEnum)
    .describe('The method used for resampling GPS coordinates.'),
  elevationMethod: z
    .nativeEnum(ElevationMethodEnum)
    .describe('The method used for replacing none/all/only missing.'),
  elevationDatasource: z
    .nativeEnum(ElevationDatasourceEnum)
    .describe('The datasource used for elevation.'),
  gpxFile:
    typeof window === 'undefined'
      ? z.unknown().optional()
      : z.instanceof(File).optional(),
});

export type CreateTrackDtoInterface = z.infer<typeof createTrackDtoSchema>;
