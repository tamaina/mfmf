import { Node } from './parser';
export declare type mfmfHTMLConf = {
    url?: string;
    jmstyle?: boolean;
    animate?: boolean;
    codeTagAsDiv?: boolean;
    rootTagName?: boolean;
    faJm?: boolean;
    search?: string;
};
declare const _default: (tokens: Node[], mentionedRemoteUsers?: {
    uri: string;
    username: string;
    host: string;
}[], config?: mfmfHTMLConf) => string | null;
export default _default;
