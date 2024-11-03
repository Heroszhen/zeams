import { IFile } from "../interfaces/interfaces";
import { Model } from "./model";

export class Conversation extends Model {
    _id?:string|null = null;
    text: string = "";
    file: IFile[] = [];
    sender?: string;
    receiver?: string;
    created: string;
}
