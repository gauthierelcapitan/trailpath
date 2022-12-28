import { Test } from '@nestjs/testing';
import { TrackService } from '@trailpath/api/app/track/track/track.service';
import { TrackView } from '@trailpath/api/app/track/track/view/track.view';
import { TrackMetadataView } from '@trailpath/api/app/track/track/view/track-metadata.view';

describe('TrackService', () => {
  let service: TrackService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TrackService],
    }).compile();

    service = app.get<TrackService>(TrackService);
  });

  describe('get', () => {
    it('should return a track by its id', async () => {
      const result: TrackView = {
        id: 'f5054664-91a0-4579-a856-14efad346441',
        filename: '',
        track: {
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [],
            type: 'LineString',
          },
        },
        points: [],
        metadata: {
          desc: '',
          name: '',
        } as TrackMetadataView,
      };

      expect(await service.get(result.id)).toEqual(result);
    });
  });
});
