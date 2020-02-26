import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingService } from './user-following.service';

describe('UserFollowingService', () => {
  let service: UserFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowingService],
    }).compile();

    service = module.get<UserFollowingService>(UserFollowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
