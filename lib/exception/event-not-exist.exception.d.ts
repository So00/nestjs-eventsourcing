import { BaseException } from "./base-exception";
export declare class EventNotExist extends BaseException {
    protected readonly name: string;
    constructor(name: string);
}
