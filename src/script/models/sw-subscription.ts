import * as mongo from 'mongodb';

export interface ISwSubscription {
	_id: mongo.ObjectID;
	userId: mongo.ObjectID;
	endpoint: string;
	auth: string;
	publickey: string;
}
