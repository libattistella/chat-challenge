import { Channel } from '../channel.model';

export interface Chat {
  channel: Channel;
  nickname: String;
  message: String;
  updated_at: Date;
}
