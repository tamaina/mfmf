import * as mongo from 'mongodb';
import { length } from 'stringz';
import { IDriveFile } from './drive-file';

export function isValidCw(text: string): boolean {
	return length(text.trim()) <= 100;
}

export type INote = {
	_id: mongo.ObjectID;
	createdAt: Date;
	deletedAt: Date;
	updatedAt?: Date;
	fileIds: mongo.ObjectID[];
	replyId: mongo.ObjectID;
	renoteId: mongo.ObjectID;
	poll: IPoll;
	text: string;
	tags: string[];
	tagsLower: string[];
	emojis: string[];
	cw: string;
	userId: mongo.ObjectID;
	appId: mongo.ObjectID;
	viaMobile: boolean;
	localOnly: boolean;
	renoteCount: number;
	repliesCount: number;
	reactionCounts: Record<string, number>;
	mentions: mongo.ObjectID[];
	mentionedRemoteUsers: {
		uri: string;
		username: string;
		host: string;
	}[];

	/**
	 * public ... 公開
	 * home ... ホームタイムライン(ユーザーページのタイムライン含む)のみに流す
	 * followers ... フォロワーのみ
	 * specified ... visibleUserIds で指定したユーザーのみ
	 */
	visibility: 'public' | 'home' | 'followers' | 'specified';

	visibleUserIds: mongo.ObjectID[];

	geo: {
		coordinates: number[];
		altitude: number;
		accuracy: number;
		altitudeAccuracy: number;
		heading: number;
		speed: number;
	};

	uri: string;

	/**
	 * 人気の投稿度合いを表すスコア
	 */
	score: number;

	// 非正規化
	_reply?: {
		userId: mongo.ObjectID;
	};
	_renote?: {
		userId: mongo.ObjectID;
	};
	_user: {
		host: string;
		inbox?: string;
	};
	_files?: IDriveFile[];
};

export type IPoll = {
	choices: IChoice[];
	multiple?: boolean;
	expiresAt?: Date;
};

export type IChoice = {
	id: number;
	text: string;
	votes: number;
};
