export declare type mfmfHTMLConf = {
    url?: string;
    jmstyle?: boolean;
    animate?: boolean;
    codeTagAsDiv?: boolean;
    rootTagName?: boolean;
    faJm?: boolean;
    search?: string;
};
export declare const toHtml: (tokens: import("../prelude/tree").Tree<import("./prelude").MfmNode>[], mentionedRemoteUsers?: {
    uri: string;
    username: string;
    host: string;
}[], config?: mfmfHTMLConf) => string | null;
