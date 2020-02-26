import { UserActivity } from './user-activity';

export class Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string; ß
  isGoing: boolean;
  isHost: boolean;
  attendees: UserActivity[];
}

export interface PaginateOptions {
  skip: number;
  take: number;
  attending?: boolean;
  hosting?: boolean;
  date?: Date;
};
export interface PageableList<T> {
  data: T[];
  totalCount: number;
  options: PaginateOptions;
}
