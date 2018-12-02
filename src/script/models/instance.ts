import * as mongo from 'mongodb';

export interface IInstance {
	_id: mongo.ObjectID;

	/**
	 * ホスト
	 */
	host: string;

	/**
	 * このインスタンスを捕捉した日時
	 */
	caughtAt: Date;

	/**
	 * このインスタンスのシステム (MastodonとかMisskeyとかPleromaとか)
	 */
	system: string;

	/**
	 * このインスタンスのユーザー数
	 */
	usersCount: number;

	/**
	 * このインスタンスから受け取った投稿数
	 */
	notesCount: number;
}
