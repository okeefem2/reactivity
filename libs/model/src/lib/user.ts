import { Photo } from './photo';

export class User {
  id?: string;
  username: string;
  password?: string;
  email?: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
  access_token?: string;
}
