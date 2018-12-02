import * as mongo from 'mongodb';

export interface IMute {
	_id: mongo.ObjectID;
	createdAt: Date;
	muterId: mongo.ObjectID;
	muteeId: mongo.ObjectID;
}
