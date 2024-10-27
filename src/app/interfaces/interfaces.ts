import { Conversation } from "../models/conversation"

export interface IInterlocutor {
    _id: string,
    name: string,
    photo: string|null
}


export interface IResponseInterlocutors {
    interlocutors: IInterlocutor[],
    conversations: Conversation[]
}

export interface IResponseInterlocutor {
    interlocutor: IInterlocutor,
    conversations: Conversation[]
}