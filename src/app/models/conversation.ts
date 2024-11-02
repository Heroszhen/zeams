import { Model } from "./model";

export class Conversation extends Model {
    _id?:string|null = null;
    text: string = "";
    file: [] = [];
    sender?: string;
    receiver?: string;
    created: string;
}
