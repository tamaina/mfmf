import * as mongo from 'mongodb';

export type IApp = {
	_id: mongo.ObjectID;
	createdAt: Date;
	userId: mongo.ObjectID | null;
	secret: string;
	name: string;
	description: string;
	permission: string[];
	callbackUrl: string;
};
