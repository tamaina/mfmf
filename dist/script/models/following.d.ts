import * as mongo from 'mongodb';
export declare type IFollowing = {
    _id: mongo.ObjectID;
    createdAt: Date;
    followeeId: mongo.ObjectID;
    followerId: mongo.ObjectID;
    stalk: boolean;
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
