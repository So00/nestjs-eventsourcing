import { IUser } from "./user.interface";
import { CallerUid } from "../../../shared/interface/caller-uid";

export type IUpdateUser = Partial<IUser> & { uuid: string } & CallerUid;
