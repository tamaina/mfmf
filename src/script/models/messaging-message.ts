import * as mongo from 'mongodb';
import { length } from 'stringz';

export interface IMessagingMessage {
	_id: mongo.ObjectID;
	createdAt: Date;
	text: string;
	userId: mongo.ObjectID;
	recipientId: mongo.ObjectID;
	isRead: boolean;
	fileId: mongo.ObjectID;
}

export function isValidText(text: string): boolean {
	return length(text.trim()) <= 1000 && text.trim() != '';
}
