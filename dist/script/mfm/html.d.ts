import { Node } from './parser';
import { Source } from '../config/types';
export declare type mfmfHTMLConf = {
    url?: string;
    jmstyle?: boolean;
    animate?: boolean;
    codeTagAsDiv?: boolean;
    faJm?: boolean;
};
declare const _default: (tokens: Node[], mentionedRemoteUsers?: {
    uri: string;
    username: string;
    host: string;
}[], conf?: Source | mfmfHTMLConf | undefined) => string | null;
export default _default;
