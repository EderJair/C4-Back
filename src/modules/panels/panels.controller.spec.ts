import { Test, TestingModule } from '@nestjs/testing';
import { PanelsController } from './panels.controller';

describe('PanelsController', () => {
  let controller: PanelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanelsController],
    }).compile();

    controller = module.get<PanelsController>(PanelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
