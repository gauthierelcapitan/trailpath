import { RamerDouglasPeuckerParam } from '@trail-path/track-resample';
import { Position } from 'geojson';

import { VisvalingamWhyattParam } from './visvalingam-whyatt/sbrl/visvalingam-whyatt-sbrl';

export abstract class ResampleAlgorithmAbstract {
  abstract resample(
    coordinates: Position[],
    params?: RamerDouglasPeuckerParam | VisvalingamWhyattParam,
  ): Position[];
}
