import * as mongo from 'mongodb';

export type IMessagingHistory = {
	_id: mongo.ObjectID;
	updatedAt: Date;
	userId: mongo.ObjectID;
	partnerId: mongo.ObjectID;
	messageId: mongo.ObjectID;
};
