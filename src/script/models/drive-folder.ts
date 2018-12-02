import * as mongo from 'mongodb';

export type IDriveFolder = {
	_id: mongo.ObjectID;
	createdAt: Date;
	name: string;
	userId: mongo.ObjectID;
	parentId: mongo.ObjectID;
};

export function isValidFolderName(name: string): boolean {
	return (
		(name.trim().length > 0) &&
		(name.length <= 200)
	);
}
