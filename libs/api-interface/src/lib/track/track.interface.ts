import { GeoJSON } from 'geojson';

export interface TrackInterface {
  filename: string;
  geojson: GeoJSON;
  id: string;
}
