import * as mongo from 'mongodb';

type IUserBase = {
	_id: mongo.ObjectID;
	createdAt: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	followersCount: number;
	followingCount: number;
	name?: string;
	notesCount: number;
	username: string;
	usernameLower: string;
	avatarId: mongo.ObjectID;
	bannerId: mongo.ObjectID;
	avatarUrl?: string;
	bannerUrl?: string;
	avatarColor?: any;
	bannerColor?: any;
	wallpaperId: mongo.ObjectID;
	wallpaperUrl?: string;
	data: any;
	description: string;
	lang?: string;
	pinnedNoteIds: mongo.ObjectID[];
	emojis?: string[];

	/**
	 * 凍結されているか否か
	 */
	isSuspended: boolean;

	/**
	 * 鍵アカウントか否か
	 */
	isLocked: boolean;

	/**
	 * Botか否か
	 */
	isBot: boolean;

	/**
	 * Botからのフォローを承認制にするか
	 */
	carefulBot: boolean;

	/**
	 * このアカウントに届いているフォローリクエストの数
	 */
	pendingReceivedFollowRequestsCount: number;

	host: string;
};

export interface ILocalUser extends IUserBase {
	host: null;
	keypair: string;
	email: string;
	emailVerified?: boolean;
	emailVerifyCode?: string;
	password: string;
	token: string;
	twitter: {
		accessToken: string;
		accessTokenSecret: string;
		userId: string;
		screenName: string;
	};
	github: {
		accessToken: string;
		id: string;
		login: string;
	};
	discord: {
		accessToken: string;
		refreshToken: string;
		expiresDate: number;
		id: string;
		username: string;
		discriminator: string;
	};
	profile: {
		location: string;
		birthday: string; // 'YYYY-MM-DD'
		tags: string[];
	};
	fields?: {
		name: string;
		value: string;
	}[];
	isCat: boolean;
	isAdmin?: boolean;
	isModerator?: boolean;
	isVerified?: boolean;
	twoFactorSecret: string;
	twoFactorEnabled: boolean;
	twoFactorTempSecret?: string;
	clientSettings: any;
	settings: {
		autoWatch: boolean;
		alwaysMarkNsfw?: boolean;
	};
	hasUnreadNotification: boolean;
	hasUnreadMessagingMessage: boolean;
}

export interface IRemoteUser extends IUserBase {
	inbox: string;
	sharedInbox?: string;
	featured?: string;
	endpoints: string[];
	uri: string;
	url?: string;
	publicKey: {
		id: string;
		publicKeyPem: string;
	};
	lastFetchedAt: Date;
	isAdmin: false;
	isModerator: false;
}

export type IUser = ILocalUser | IRemoteUser;

export const isLocalUser = (user: any): user is ILocalUser =>
	user.host === null;

export const isRemoteUser = (user: any): user is IRemoteUser =>
	!isLocalUser(user);

//#region Validators
export function validateUsername(username: string, remote?: boolean): boolean {
	return typeof username == 'string' && (remote ? /^\w([\w-]*\w)?$/ : /^\w{1,20}$/).test(username);
}

export function validatePassword(password: string): boolean {
	return typeof password == 'string' && password != '';
}

export function isValidName(name?: string): boolean {
	return name === null || (typeof name == 'string' && name.length < 50 && name.trim() != '');
}

export function isValidDescription(description: string): boolean {
	return typeof description == 'string' && description.length < 500 && description.trim() != '';
}

export function isValidLocation(location: string): boolean {
	return typeof location == 'string' && location.length < 50 && location.trim() != '';
}

export function isValidBirthday(birthday: string): boolean {
	return typeof birthday == 'string' && /^([0-9]{4})\-([0-9]{2})-([0-9]{2})$/.test(birthday);
}
//#endregion
