import * as mongo from 'mongodb';

export type IAccessToken = {
	_id: mongo.ObjectID;
	createdAt: Date;
	appId: mongo.ObjectID;
	userId: mongo.ObjectID;
	token: string;
	hash: string;
};
