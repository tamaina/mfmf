import * as mongo from 'mongodb';

export type IMetadata = {
	originalId: mongo.ObjectID;
};

export type IDriveFileWebpublic = {
	_id: mongo.ObjectID;
	uploadDate: Date;
	md5: string;
	filename: string;
	contentType: string;
	metadata: IMetadata;
};
