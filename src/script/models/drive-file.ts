import * as mongo from 'mongodb';

export type IMetadata = {
	properties: any;
	userId: mongo.ObjectID;
	_user: any;
	folderId: mongo.ObjectID;
	comment: string;

	/**
	 * リモートインスタンスから取得した場合の元URL
	 */
	uri?: string;

	/**
	 * URL for web(生成されている場合) or original
	 * * オブジェクトストレージを利用している or リモートサーバーへの直リンクである 場合のみ
	 */
	url?: string;

	/**
	 * URL for thumbnail (thumbnailがなければなし)
	 * * オブジェクトストレージを利用している or リモートサーバーへの直リンクである 場合のみ
	 */
	thumbnailUrl?: string;

	/**
	 * URL for original (web用が生成されてない場合はurlがoriginalを指す)
	 * * オブジェクトストレージを利用している or リモートサーバーへの直リンクである 場合のみ
	 */
	webpublicUrl?: string;

	accessKey?: string;

	src?: string;
	deletedAt?: Date;

	/**
	 * このファイルの中身データがMongoDB内に保存されていないか否か
	 * オブジェクトストレージを利用している or リモートサーバーへの直リンクである
	 * な場合は true になります
	 */
	withoutChunks?: boolean;

	storage?: string;

	/***
	 * ObjectStorage の格納先の情報
	 */
	storageProps?: IStorageProps;
	isSensitive?: boolean;

	/**
	 * このファイルが添付された投稿のID一覧
	 */
	attachedNoteIds?: mongo.ObjectID[];

	/**
	 * 外部の(信頼されていない)URLへの直リンクか否か
	 */
	isRemote?: boolean;
};

export type IStorageProps = {
	/**
	 * ObjectStorage key for original
	 */
	key: string;

	/***
	 * ObjectStorage key for thumbnail (thumbnailがなければなし)
	 */
	thumbnailKey?: string;

	/***
	 * ObjectStorage key for webpublic (webpublicがなければなし)
	 */
	webpublicKey?: string;

	id?: string;
};

export type IDriveFile = {
	_id: mongo.ObjectID;
	uploadDate: Date;
	md5: string;
	filename: string;
	contentType: string;
	metadata: IMetadata;

	/**
	 * ファイルサイズ
	 */
	length: number;
};

export function validateFileName(name: string): boolean {
	return (
		(name.trim().length > 0) &&
		(name.length <= 200) &&
		(name.indexOf('\\') === -1) &&
		(name.indexOf('/') === -1) &&
		(name.indexOf('..') === -1)
	);
}
