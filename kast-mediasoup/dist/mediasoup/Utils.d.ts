export declare type Filter = {
    [key: string]: unknown;
};
export declare const matchAppData: (appData: Filter, filter: Filter) => boolean;
export declare const removeFromArray: <T>(array: T[], item: T) => void;
