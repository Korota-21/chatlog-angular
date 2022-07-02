import { IUser } from 'src/app/interfaces/user';

export interface IChat {
  _id: string;
  users: IUser[];
  createdAt: string;
}
