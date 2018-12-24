import * as mongo from 'mongodb';

export type IEmoji = {
	_id: mongo.ObjectID;
	name: string;
	host: string;
	url: string;
	aliases?: string[];
	updatedAt?: Date;
	/** AP object id */
	uri?: string;
};
