import { Photo } from './photo';

// UI and API response model for user
export interface User {
  id?: string;
  username: string;
  password?: string;
  email?: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
  access_token?: string;
  isFollowed?: boolean;
  followers?: any;
  following?: any;
}
