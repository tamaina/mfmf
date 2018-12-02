import * as mongo from 'mongodb';
import { Context } from 'cafy';
import isObjectId from './is-objectid';

export const isAnId = (x: any) => mongo.ObjectID.isValid(x);
export const isNotAnId = (x: any) => !isAnId(x);
export const transform = (x: string | mongo.ObjectID): mongo.ObjectID => {
	if (x == null) return null;

	if (isAnId(x) && !isObjectId(x)) {
		return new mongo.ObjectID(x);
	} else {
		return x as mongo.ObjectID;
	}
};
export const transformMany = (xs: (string | mongo.ObjectID)[]): mongo.ObjectID[] => {
	if (xs == null) return null;

	return xs.map(x => transform(x));
};

export type ObjectId = mongo.ObjectID;

/**
 * ID
 */
export default class ID extends Context<string> {
	constructor() {
		super();

		this.push((v: any) => {
			if (!isObjectId(v) && isNotAnId(v)) {
				return new Error('must-be-an-id');
			}
			return true;
		});
	}

	public getType() {
		return super.getType('string');
	}
}
