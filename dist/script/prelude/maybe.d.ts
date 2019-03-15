export interface Maybe<T> {
    isJust(): this is Just<T>;
}
export declare type Just<T> = Maybe<T> & {
    get(): T;
};
export declare function just<T>(value: T): Just<T>;
export declare function nothing<T>(): Maybe<T>;
