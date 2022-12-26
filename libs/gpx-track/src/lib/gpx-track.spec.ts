import { TrackInterface } from '@trailpath/api-interface/track/track.interface';
import * as fs from 'fs';

import { gpxToTrack, trackToGpx } from './gpx-track';

describe('Lib :: GpxTrack', () => {
  it('should convert gpx file to track', () => {
    const gpxFile = __dirname + '/../../../gpx-shared/gpx/col-ferret.gpx';

    const gpxString = fs.readFileSync(gpxFile, 'utf8');

    const track = gpxToTrack(gpxString, 'col-ferret.gpx');

    expect(track.track.geometry.coordinates.length).toEqual(1272);
    expect(track.points.length).toEqual(3);
    expect(track.filename).toEqual('col-ferret.gpx');
    expect(track.metadata.name).toEqual('Col Ferret Uphill');
    expect(track.metadata.desc).toEqual('Col Ferret Uphill Segment.');
    expect(track.track.properties).toEqual({
      desc: 'Col Ferret Uphill Segment Track.',
      name: 'Col Ferret Uphill Track',
    });
  });

  it('should convert geojson to gpx', () => {
    const track: TrackInterface = {
      points: [
        {
          type: 'Feature',
          properties: {
            name: 'Chalet Val Ferret',
            desc: 'Restaurant Chalet Val Ferret',
          },
          geometry: { type: 'Point', coordinates: [7.05395, 45.87148, 1777] },
        },
        {
          type: 'Feature',
          properties: {
            name: 'Refuge Elena',
            desc: 'Refuge Elena security check',
          },
          geometry: { type: 'Point', coordinates: [7.06599, 45.88405, 1777] },
        },
        {
          type: 'Feature',
          properties: {
            name: 'Grand Col Ferret',
            desc: 'Grand Col Ferret checkpoint',
          },
          geometry: { type: 'Point', coordinates: [7.07813, 45.88977, 2503] },
        },
      ],
      track: {
        type: 'Feature',
        properties: {
          name: 'Col Ferret Uphill Track',
          desc: 'Col Ferret Uphill Segment Track.',
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [7.05395, 45.87148, 1776.9],
            [7.05389, 45.8715, 1775.9],
            [7.07813, 45.88977, 2503.8],
          ],
        },
      },
      filename: 'col-ferret.gpx',
      metadata: {
        name: 'Col Ferret Uphill',
        desc: 'Col Ferret Uphill Segment.',
      },
    };

    const gpx = trackToGpx(track);

    expect(gpx.length).toEqual(1200);
    expect(gpx.slice(0, 4)).toEqual('<gpx');
  });
});
