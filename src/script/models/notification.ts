import * as mongo from 'mongodb';
import { IUser } from './user';

export interface INotification {
	_id: mongo.ObjectID;
	createdAt: Date;

	/**
	 * 通知の受信者
	 */
	notifiee?: IUser;

	/**
	 * 通知の受信者
	 */
	notifieeId: mongo.ObjectID;

	/**
	 * イニシエータ(initiator)、Origin。通知を行う原因となったユーザー
	 */
	notifier?: IUser;

	/**
	 * イニシエータ(initiator)、Origin。通知を行う原因となったユーザー
	 */
	notifierId: mongo.ObjectID;

	/**
	 * 通知の種類。
	 * follow - フォローされた
	 * mention - 投稿で自分が言及された
	 * reply - (自分または自分がWatchしている)投稿が返信された
	 * renote - (自分または自分がWatchしている)投稿がRenoteされた
	 * quote - (自分または自分がWatchしている)投稿が引用Renoteされた
	 * reaction - (自分または自分がWatchしている)投稿にリアクションされた
	 * poll_vote - (自分または自分がWatchしている)投稿の投票に投票された
	 */
	type: 'follow' | 'mention' | 'reply' | 'renote' | 'quote' | 'reaction' | 'poll_vote';

	/**
	 * 通知が読まれたかどうか
	 */
	isRead: Boolean;
}
