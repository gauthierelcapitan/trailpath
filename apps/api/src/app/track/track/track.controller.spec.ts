import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TrackController } from '@trailpath/api/app/track/track/track.controller';
import { TrackService } from '@trailpath/api/app/track/track/track.service';
import { TrackView } from '@trailpath/api/app/track/track/view/track.view';

describe('TrackController', () => {
  let trackController: TrackController;
  let trackService: TrackService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [TrackService],
    }).compile();

    trackService = moduleRef.get<TrackService>(TrackService);
    trackController = moduleRef.get<TrackController>(TrackController);

    jest.clearAllMocks();
  });

  it('it should be defined', () => {
    expect(trackController).toBeDefined();
    expect(trackService).toBeDefined();
  });

  describe('get', () => {
    it('should return a track by its id', async () => {
      const result: TrackView = {
        id: 'f5054664-91a0-4579-a856-14efad346441',
        filename: 'my-track.gpx',
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
        },
      };

      jest
        .spyOn(trackService, 'get')
        .mockImplementation(() => Promise.resolve(result));

      await expect(await trackController.get(result.id)).toBe(result);
    });

    it('should fail to return a track and throw a 404', async () => {
      const id = 'f5054664-91a0-4579-a856-14efad346441';

      jest
        .spyOn(trackService, 'get')
        .mockImplementation(() => Promise.resolve(undefined));

      try {
        await trackController.get(id);
        fail('it should not reach here');
      } catch (e) {
        e.status = HttpStatus.NOT_FOUND;
      }
    });
  });
});
