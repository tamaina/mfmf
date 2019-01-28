import * as mongo from 'mongodb';
export interface INoteReaction {
    _id: mongo.ObjectID;
    createdAt: Date;
    noteId: mongo.ObjectID;
    userId: mongo.ObjectID;
    reaction: string;
}
export declare const validateReaction: import("cafy").StringContext;
