import * as mongo from 'mongodb';

export interface IPollVote {
	_id: mongo.ObjectID;
	createdAt: Date;
	userId: mongo.ObjectID;
	noteId: mongo.ObjectID;
	choice: number;
}
