import { Injectable } from '@nestjs/common';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { TrackView } from '@trailpath/api/app/track/track/view/track.view';
import { GpxDistanceMethodEnum, length } from '@trailpath/gpx-distance';
import { GpxResampleMethodEnum, resample } from '@trailpath/gpx-resample';
import { gpxToTrack } from '@trailpath/gpx-track';
import { Feature, GeoJsonProperties, LineString } from 'geojson';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  create(
    file: UploadedFileInterface,
    distanceMethod: GpxDistanceMethodEnum,
    resampleMethod: GpxResampleMethodEnum,
  ): string {
    const gpxString = file.buffer.toString('utf-8');
    const filename = file.fieldname;

    const track = gpxToTrack(gpxString, filename);

    const trackResampled = resample(
      track.track,
      resampleMethod,
      distanceMethod,
    );

    const distance = length(trackResampled, distanceMethod);

    console.log({ distance });

    return uuidv4();
  }

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
