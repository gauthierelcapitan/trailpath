import { Test } from '@nestjs/testing';
import { CreateTrackController } from '@trailpath/api/app/track/track/create-track/create-track.controller';
import { TrackService } from '@trailpath/api/app/track/track/track.service';

describe('CreateTrackController', () => {
  let createTrackController: CreateTrackController;
  let trackService: TrackService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateTrackController],
      providers: [TrackService],
    }).compile();

    trackService = moduleRef.get<TrackService>(TrackService);
    createTrackController = moduleRef.get<CreateTrackController>(
      CreateTrackController,
    );

    jest.clearAllMocks();
  });

  // noinspection DuplicatedCode
  it('it should be defined', () => {
    expect(createTrackController).toBeDefined();
    expect(trackService).toBeDefined();
  });
});
