import * as mongo from 'mongodb';
export interface IUserList {
    _id: mongo.ObjectID;
    createdAt: Date;
    title: string;
    userId: mongo.ObjectID;
    userIds: mongo.ObjectID[];
}
