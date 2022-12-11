import { Injectable } from '@nestjs/common';
import { TrackView } from '@trailpath/api/app/track/view/track.view';
import { GeoJSON } from 'geojson';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  create(): string {
    return uuidv4();
  }

  async get(id: string): Promise<TrackView> {
    const geoJson: GeoJSON = {
      type: 'LineString',
      coordinates: [],
    };

    return new TrackView(id, '', geoJson);
  }
}
