import { Test, TestingModule } from '@nestjs/testing';
import { Videos } from './videos';

describe('Videos', () => {
  let provider: Videos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Videos],
    }).compile();

    provider = module.get<Videos>(Videos);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
