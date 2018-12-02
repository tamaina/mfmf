import * as mongo from 'mongodb';
export declare type IEmoji = {
    _id: mongo.ObjectID;
    name: string;
    host: string;
    url: string;
    aliases?: string[];
    updatedAt?: Date;
};
