import * as mongo from 'mongodb';
export declare type IBlocking = {
    _id: mongo.ObjectID;
    createdAt: Date;
    blockeeId: mongo.ObjectID;
    blockerId: mongo.ObjectID;
};
