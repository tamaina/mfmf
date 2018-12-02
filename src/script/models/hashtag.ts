import * as mongo from 'mongodb';

export interface IHashtags {
	tag: string;
	mentionedUserIds: mongo.ObjectID[];
	mentionedUserIdsCount: number;
}
