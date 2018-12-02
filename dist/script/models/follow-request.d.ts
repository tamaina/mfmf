import * as mongo from 'mongodb';
export declare type IFollowRequest = {
    _id: mongo.ObjectID;
    createdAt: Date;
    followeeId: mongo.ObjectID;
    followerId: mongo.ObjectID;
    requestId?: string;
    _followee: {
        host: string;
        inbox?: string;
        sharedInbox?: string;
    };
    _follower: {
        host: string;
        inbox?: string;
        sharedInbox?: string;
    };
};
