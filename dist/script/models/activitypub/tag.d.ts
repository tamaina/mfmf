import { IIcon } from "./icon";
/***
 * tag (ActivityPub)
 */
export declare type ITag = {
    id: string;
    type: string;
    name?: string;
    value?: string;
    updated?: Date;
    icon?: IIcon;
};
