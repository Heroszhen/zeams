import { Model } from "./model";

export class Profile extends Model {
    _id:string|null = null;
    name:string = "";
    email:string = "";
    photo:string = "";
    created:string = "";
}
