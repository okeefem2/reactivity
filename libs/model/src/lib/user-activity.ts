import { User } from './user';

export interface UserActivity {
  isHost: boolean;

  user: Partial<User>;
}
