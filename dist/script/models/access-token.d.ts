import * as mongo from 'mongodb';
export declare type IAccessToken = {
    _id: mongo.ObjectID;
    createdAt: Date;
    appId: mongo.ObjectID;
    userId: mongo.ObjectID;
    token: string;
    hash: string;
};
