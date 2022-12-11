import { Test } from '@nestjs/testing';
import { TrackService } from '@trailpath/api/app/track/track.service';
import { TrackView } from '@trailpath/api/app/track/view/track.view';

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
        geojson: {
          type: 'LineString',
          coordinates: [],
        },
      };

      expect(await service.get(result.id)).toEqual(result);
    });
  });
});
