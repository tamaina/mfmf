import * as mongo from 'mongodb';
import $ from 'cafy';

export interface INoteReaction {
	_id: mongo.ObjectID;
	createdAt: Date;
	noteId: mongo.ObjectID;
	userId: mongo.ObjectID;
	reaction: string;
}

export const validateReaction = $.str.or([
	'like',
	'love',
	'laugh',
	'hmm',
	'surprise',
	'congrats',
	'angry',
	'confused',
	'rip',
	'pudding'
])
