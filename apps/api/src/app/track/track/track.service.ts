import { Injectable } from '@nestjs/common';
import { TrackView } from '@trailpath/api/app/track/track/view/track.view';
import { Feature, GeoJsonProperties, LineString } from 'geojson';

@Injectable()
export class TrackService {
  async get(id: string): Promise<TrackView> {
    const track: Feature<LineString, GeoJsonProperties> = {
      properties: {},
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    };

    return new TrackView(id, {
      filename: '',
      metadata: { desc: '', name: '' },
      points: [],
      track,
    });
  }
}
