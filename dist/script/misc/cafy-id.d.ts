import * as mongo from 'mongodb';
import { Context } from 'cafy';
export declare const isAnId: (x: any) => boolean;
export declare const isNotAnId: (x: any) => boolean;
export declare const transform: (x: string | mongo.ObjectID | null) => mongo.ObjectID | null;
export declare const transformMany: (xs: (string | mongo.ObjectID | null)[]) => (mongo.ObjectID | null)[];
export declare type ObjectId = mongo.ObjectID;
/**
 * ID
 */
export default class ID extends Context<string> {
    constructor();
    getType(): string;
}
