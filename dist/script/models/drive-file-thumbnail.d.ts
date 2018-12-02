import * as mongo from 'mongodb';
export declare type IMetadata = {
    originalId: mongo.ObjectID;
};
export declare type IDriveFileThumbnail = {
    _id: mongo.ObjectID;
    uploadDate: Date;
    md5: string;
    filename: string;
    contentType: string;
    metadata: IMetadata;
};
