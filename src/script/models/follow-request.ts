import * as mongo from 'mongodb';

export type IFollowRequest = {
	_id: mongo.ObjectID;
	createdAt: Date;
	followeeId: mongo.ObjectID;
	followerId: mongo.ObjectID;
	requestId?: string;	// id of Follow Activity

	// 非正規化
	_followee: {
		host: string;
		inbox?: string;
		sharedInbox?: string;
	},
	_follower: {
		host: string;
		inbox?: string;
		sharedInbox?: string;
	}
};
