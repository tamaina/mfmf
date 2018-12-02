import * as mongo from 'mongodb';
export declare type IDriveFolder = {
    _id: mongo.ObjectID;
    createdAt: Date;
    name: string;
    userId: mongo.ObjectID;
    parentId: mongo.ObjectID;
};
export declare function isValidFolderName(name: string): boolean;
