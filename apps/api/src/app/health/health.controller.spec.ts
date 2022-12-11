import { Test } from '@nestjs/testing';
import { HealthController } from '@trailpath/api/app/health/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
  });

  describe('check', () => {
    it('should return a track by its id', async () => {
      const result = { status: 'ok', details: {} };

      expect(await healthController.check()).toStrictEqual(result);
    });
  });
});
