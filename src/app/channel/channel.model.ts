import { User } from './users/user.model';
import { Chat } from './chat/chat.model';

export interface Channel {
  name: String;
  active: Boolean;
  connectedUsers: User[];
  chats: Chat[];
}
