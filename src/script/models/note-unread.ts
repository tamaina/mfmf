import * as mongo from 'mongodb';

export interface INoteUnread {
	_id: mongo.ObjectID;
	noteId: mongo.ObjectID;
	userId: mongo.ObjectID;
	isSpecified: boolean;

	_note: {
		userId: mongo.ObjectID;
	};
}
