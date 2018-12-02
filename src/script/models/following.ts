import * as mongo from 'mongodb';

export type IFollowing = {
	_id: mongo.ObjectID;
	createdAt: Date;
	followeeId: mongo.ObjectID;
	followerId: mongo.ObjectID;
	stalk: boolean;

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
