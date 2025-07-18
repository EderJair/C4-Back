import { Test, TestingModule } from '@nestjs/testing';
import { RingsController } from './rings.controller';

describe('RingsController', () => {
  let controller: RingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingsController],
    }).compile();

    controller = module.get<RingsController>(RingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
