import { User } from './user';
import { Activity } from './activity';

export interface Comment {
  id?: string;
  body?: string;
  author?: Partial<User>;
  authorId?: string;
  activityId: string;
  activity?: Partial<Activity>;
  date?: Date;
}
