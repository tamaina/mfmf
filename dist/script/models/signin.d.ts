import * as mongo from 'mongodb';
export interface ISignin {
    _id: mongo.ObjectID;
    createdAt: Date;
    userId: mongo.ObjectID;
    ip: string;
    headers: any;
    success: boolean;
}
