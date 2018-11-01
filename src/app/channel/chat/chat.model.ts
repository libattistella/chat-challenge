import { User } from '../users/user.model';

export interface Chat {
  _id: String;
  channel: String;
  user: User;
  message: String;
  created_at: Date;
}
