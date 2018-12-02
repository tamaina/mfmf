import * as mongo from 'mongodb';

export type IBlocking = {
	_id: mongo.ObjectID;
	createdAt: Date;
	blockeeId: mongo.ObjectID;
	blockerId: mongo.ObjectID;
};
