import * as mongo from 'mongodb';
export interface INoteWatching {
    _id: mongo.ObjectID;
    createdAt: Date;
    userId: mongo.ObjectID;
    noteId: mongo.ObjectID;
}
