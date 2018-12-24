export declare type Predicate<T> = (a: T) => boolean;
export declare type Relation<T, U> = (a: T, b: U) => boolean;
export declare type EndoRelation<T> = Relation<T, T>;
