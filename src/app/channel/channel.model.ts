import { User } from './users/user.model';
import { Chat } from './chat/chat.model';

export interface Channel {
  _id: String;
  name: String;
  connectedUsers: User[];
  chats: Chat[];
}
