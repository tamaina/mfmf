import * as mongo from 'mongodb';
export interface IMessagingMessage {
    _id: mongo.ObjectID;
    createdAt: Date;
    text: string;
    userId: mongo.ObjectID;
    recipientId: mongo.ObjectID;
    isRead: boolean;
    fileId: mongo.ObjectID;
}
export declare function isValidText(text: string): boolean;
