import * as mongo from 'mongodb';

export interface IRegistrationTicket {
	_id: mongo.ObjectID;
	createdAt: Date;
	code: string;
}
