import * as mongo from 'mongodb';

export type IFavorite = {
	_id: mongo.ObjectID;
	createdAt: Date;
	userId: mongo.ObjectID;
	noteId: mongo.ObjectID;
};
