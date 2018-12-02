import * as mongo from 'mongodb';
export interface IReversiGame {
    _id: mongo.ObjectID;
    createdAt: Date;
    startedAt: Date;
    user1Id: mongo.ObjectID;
    user2Id: mongo.ObjectID;
    user1Accepted: boolean;
    user2Accepted: boolean;
    /**
     * どちらのプレイヤーが先行(黒)か
     * 1 ... user1
     * 2 ... user2
     */
    black: number;
    isStarted: boolean;
    isEnded: boolean;
    winnerId: mongo.ObjectID;
    surrendered: mongo.ObjectID;
    logs: Array<{
        at: Date;
        color: boolean;
        pos: number;
    }>;
    settings: {
        map: string[];
        bw: string | number;
        isLlotheo: boolean;
        canPutEverywhere: boolean;
        loopedBoard: boolean;
    };
    form1: any;
    form2: any;
    crc32: string;
}
