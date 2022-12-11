import { Injectable } from '@nestjs/common';
import { TrackView } from '@trailpath/api/app/track/view/track.view';
import { GeoJSON } from 'geojson';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  create(): string {
    return uuidv4();
  }

  get(id: string) {
    const geoJson: GeoJSON = {
      type: 'LineString',
      coordinates: [],
    };

    return new TrackView(id, '', geoJson);
  }
}
