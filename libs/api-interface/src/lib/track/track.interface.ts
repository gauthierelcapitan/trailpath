import { TrackMetadataInterface } from '@trailpath/api-interface/track/track-metadata.interface';
import { Feature, GeoJsonProperties, LineString, Point } from 'geojson';

export interface TrackInterface {
  filename: string;
  metadata: TrackMetadataInterface;
  points: Feature<Point>[];
  track: Feature<LineString, GeoJsonProperties>;
}
