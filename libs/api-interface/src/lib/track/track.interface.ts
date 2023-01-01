import { Feature, GeoJsonProperties, LineString, Point } from 'geojson';

import { TrackMetadataInterface } from './track-metadata.interface';

export interface TrackInterface {
  filename: string;
  metadata: TrackMetadataInterface;
  points: Feature<Point>[];
  track: Feature<LineString, GeoJsonProperties>;
}
