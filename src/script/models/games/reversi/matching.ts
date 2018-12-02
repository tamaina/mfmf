import * as mongo from 'mongodb';

export interface IMatching {
	_id: mongo.ObjectID;
	createdAt: Date;
	parentId: mongo.ObjectID;
	childId: mongo.ObjectID;
}
