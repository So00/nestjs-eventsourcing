import { CallerUid } from "../../../shared/interface/caller-uid";

export type IUser = {
  uuid: string;
  lastName: string;
  firstName: string;
  email: string;
  username: string;
  password: string;
};

export type CreateUser = Omit<IUser, "uuid"> & CallerUid;

export type UserCreated = IUser & CallerUid;
