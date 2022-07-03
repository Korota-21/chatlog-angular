import { IChat } from "./chat";
import { IUser } from "./user";

export interface IMessage {
  _id: string,
  message: string,
  user: string,
  chat: IChat,
  updatedAt: string,
  createdAt: string,
}
