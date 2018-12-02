export type IMeta = {
	name?: string;
	description?: string;

	/**
	 * メンテナ情報
	 */
	maintainer: {
		/**
		 * メンテナの名前
		 */
		name: string;

		/**
		 * メンテナの連絡先
		 */
		email?: string;
	};

	langs?: string[];

	broadcasts?: any[];

	stats?: {
		notesCount: number;
		originalNotesCount: number;
		usersCount: number;
		originalUsersCount: number;
	};

	disableRegistration?: boolean;
	disableLocalTimeline?: boolean;
	hidedTags?: string[];
	bannerUrl?: string;

	cacheRemoteFiles?: boolean;

	proxyAccount?: string;

	enableRecaptcha?: boolean;
	recaptchaSiteKey?: string;
	recaptchaSecretKey?: string;

	/**
	 * Drive capacity of a local user (MB)
	 */
	localDriveCapacityMb?: number;

	/**
	 * Drive capacity of a remote user (MB)
	 */
	remoteDriveCapacityMb?: number;

	/**
	 * Max allowed note text length in charactors
	 */
	maxNoteTextLength?: number;

	summalyProxy?: string;

	enableTwitterIntegration?: boolean;
	twitterConsumerKey?: string;
	twitterConsumerSecret?: string;

	enableGithubIntegration?: boolean;
	githubClientId?: string;
	githubClientSecret?: string;

	enableDiscordIntegration?: boolean;
	discordClientId?: string;
	discordClientSecret?: string;

	enableExternalUserRecommendation?: boolean;
	externalUserRecommendationEngine?: string;
	externalUserRecommendationTimeout?: number;

	enableEmail?: boolean;
	email?: string;
	smtpSecure?: boolean;
	smtpHost?: string;
	smtpPort?: number;
	smtpUser?: string;
	smtpPass?: string;
};
