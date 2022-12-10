import { GeoJSON } from 'geojson';

export interface TrackInterface {
  id: string;
  filename: string;
  geojson: GeoJSON;
}
