import { TextElement } from './parse';
declare type options = {
    baseUrl?: string;
    nostyle?: boolean;
    disableAnimate?: boolean;
};
declare const _default: (input: string | TextElement[], options: options) => string;
export default _default;
