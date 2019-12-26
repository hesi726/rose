namespace net {

    export interface IHttpRequestInfoCallFunc {
        (err: Error, data: any): void;
    }

    export interface IHttpRequestInfoArgs {
        [index: string]: any;
    }

    export interface IHttpRequestInfo {
        requestId: number;
        route: string;
        args: IHttpRequestInfoArgs;
        cb: IHttpRequestInfoCallFunc;
        ctx: any;
    }

    export class HttpRequestInfo implements IHttpRequestInfo {
        requestId: number;
        route: string;
        args: IHttpRequestInfoArgs;
        cb: IHttpRequestInfoCallFunc;
        ctx: any;
    }

}