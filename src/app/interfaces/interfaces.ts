import { Conversation } from "../models/conversation"

export interface IInterlocutor {
    _id: string,
    name: string,
    photo: string|null,
    created: string,
    state?: string
}


export interface IResponseInterlocutors {
    interlocutors: IInterlocutor[],
    conversations: Conversation[]
}

export interface IResponseInterlocutor {
    interlocutor: IInterlocutor,
    conversations: Conversation[]
}

export interface IFile {
    originalName: string, 
    newName: string,
    fileType: string,
    link: string,
    created: string,
    sender?: string,
}

export interface IResponseConversation {
    conversation:Conversation, 
    interlocutor?: IInterlocutor
}