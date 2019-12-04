namespace net {

    /**
     * get 请求，命名 request
     * post 请求格式有 json、FormData，命名 post4Json post4FormData
     * 
     * 为完成功能 
     *   添加设置头
     *   post4FormData 请求方法
     */
    export class HttpServer {

        static ON_ERROR = "error";
        static ON_CLOSE = "close";
        static ON_KICK = "kick";
        static ON_SUCCESS = "success";
        static ON_ROUTE_ERROR = "resultError";
        static ON_ROUTE_SUCCESS = "resultSuccess";

        httpHost: string;
        httpPort: string;

        protected _httpUrl: string;
        protected _requestIdCounter: number;

        private _waitingRequestMap: { [key: number]: IHttpRequestInfo };

        constructor() {
            this._initProp();
        }

        protected _initProp(): void {
            this._requestIdCounter = 1;
            this._waitingRequestMap = {};
        };

        /**
         * get 请求
         * @param route 
         * @param args 
         * @param cb 
         * @param ctx 
         */
        request(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): void {
            const requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestHttpGet(requestInfo);
        };

        protected _requestHttpGet(requestInfo: IHttpRequestInfo): void {

            const route = requestInfo.route;
            const args = requestInfo.args;

            let httpUrl = this._httpUrl + route + '?';

            // httpUrl = Object.keys(args).reduce((prev, cur) => `${prev}&${cur}=${args[cur]}`, httpUrl);

            for (let key in args) {
                httpUrl += key + '=' + args[key] + '&';
            }
            httpUrl = httpUrl.substring(0, httpUrl.lastIndexOf('&'));

            const request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT; //默认值
            request.open(httpUrl, egret.HttpMethod.GET);

            request.once(egret.Event.COMPLETE, (evt: egret.Event) => {
                const result = <egret.HttpRequest>evt.currentTarget;
                const response = result.response;
                this._handleRequestResult(requestInfo, response);
            }, this);

            request.once(egret.IOErrorEvent.IO_ERROR, (evt: egret.IOErrorEvent) => {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                this._handleRequestError(requestInfo, evt);
            }, this);

            request.send();
        }

        /**
         * json 格式 post 请求
         * @param route 
         * @param args 
         * @param cb 
         * @param ctx 
         */
        post4Json(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): void {
            const requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestPost4Json(requestInfo);
        }

        private _requestPost4Json(requestInfo: IHttpRequestInfo): void {
            const route = requestInfo.route;
            const args = requestInfo.args;

            const httpUrl = this._httpUrl + route;

            const request = new egret.HttpRequest();
            request.setRequestHeader("Content-Type", "application/json");
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(httpUrl, egret.HttpMethod.POST);

            request.once(egret.Event.COMPLETE, (evt: egret.Event) => {
                const result = <egret.HttpRequest>evt.currentTarget;
                const response = result.response;
                this._handleRequestResult(requestInfo, response);
            }, this);

            request.once(egret.IOErrorEvent.IO_ERROR, (evt: egret.IOErrorEvent) => {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                this._handleRequestError(requestInfo, evt);
            }, this);

            request.send(args);
        };

        protected _getRequestInfo(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): IHttpRequestInfo {
            const requestId = this._requestIdCounter++;
            const requestInfo = new HttpRequestInfo();
            requestInfo.requestId = requestId;
            requestInfo.route = route;
            requestInfo.args = args;
            requestInfo.cb = cb;
            requestInfo.ctx = ctx;
            return requestInfo;
        }

        /**
         * 处理请求结果
         * @param requestInfo 
         * @param result 
         */
        protected _handleRequestResult(requestInfo: IHttpRequestInfo, result: any): void {

            const requestId = requestInfo.requestId;
            const cb = requestInfo.cb;
            const ctx = requestInfo.ctx;
            cb.call(ctx, null, result); //第一个参数为错误

            delete this._waitingRequestMap[requestId]; //从等待中移除
        };

        /**
         * 
         * @param evt 
         */
        protected _handleRequestError(requestInfo: IHttpRequestInfo, errInfo: egret.IOErrorEvent): void {

            const requestId = requestInfo.requestId;
            const cb = requestInfo.cb;
            const ctx = requestInfo.ctx;
            cb.call(ctx, new Error(errInfo.type), null);

            delete this._waitingRequestMap[requestId];
        };

        reset(): void {
            this._waitingRequestMap = {}; //清空缓存的请求
            this._requestIdCounter = 1; //计数重置
        };
    }
}
