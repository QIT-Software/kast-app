/// <reference types="express" />
export declare const httpLogger: () => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>;
export declare const storeLogger: (message: string, subject: string) => string;
export declare const managerLogger: (message: string, subject: string) => string;
export declare const graphQlLogger: (message: string, subject: string) => string;
