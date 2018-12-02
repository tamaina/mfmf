import * as mongo from 'mongodb';
export interface IAuthSession {
    _id: mongo.ObjectID;
    createdAt: Date;
    appId: mongo.ObjectID;
    userId: mongo.ObjectID;
    token: string;
}
