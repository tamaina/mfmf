import * as mongo from 'mongodb';
import isObjectId from '../misc/is-objectid';
import { length } from 'stringz';
import { IDriveFile } from './drive-file';

export function isValidCw(text: string): boolean {
	return length(text.trim()) <= 100;
}

export type INote = {
	_id: mongo.ObjectID;
	createdAt: Date;
	deletedAt: Date;
	fileIds: mongo.ObjectID[];
	replyId: mongo.ObjectID;
	renoteId: mongo.ObjectID;
	poll: {
		choices: Array<{
			id: number;
		}>
	};
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
	reactionCounts: any;
	mentions: mongo.ObjectID[];
	mentionedRemoteUsers: Array<{
		uri: string;
		username: string;
		host: string;
	}>;

	/**
	 * public ... 公開
	 * home ... ホームタイムライン(ユーザーページのタイムライン含む)のみに流す
	 * followers ... フォロワーのみ
	 * specified ... visibleUserIds で指定したユーザーのみ
	 * private ... 自分のみ
	 */
	visibility: 'public' | 'home' | 'followers' | 'specified' | 'private';

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
}
