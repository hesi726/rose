namespace utils {

    type callBackType = (timeStamp: number) => boolean;

    class TimedTaskTicker {

        public constructor() { }

        /**
         * @private
         * ticker 花销的时间
         */
        private costEnterFrame: number = 0;

        /**
         * @private
         * 是否被暂停
         */
        private isPaused: boolean = false;

        /**
         * @private
         */
        private callBackList: callBackType[] = [];
        /**
         * @private
         */
        private thisObjectList: any[] = [];

        public startTick(callBack: (timeStamp: number) => boolean, thisObject: any): void {
            let index = this.getTickIndex(callBack, thisObject);
            if (index != -1) {
                return;
            }
            this.concatTick();
            this.callBackList.push(callBack);
            this.thisObjectList.push(thisObject);
        }

        public stopTick(callBack: (timeStamp: number) => boolean, thisObject: any): void {
            let index = this.getTickIndex(callBack, thisObject);
            if (index === -1) {
                return;
            }
            this.concatTick();
            this.callBackList.splice(index, 1);
            this.thisObjectList.splice(index, 1);
        }

        /**
         * @private
         */
        private getTickIndex(callBack: Function, thisObject: any): number {
            let callBackList = this.callBackList;
            let thisObjectList = this.thisObjectList;
            for (let i = callBackList.length - 1; i >= 0; i--) {
                if (callBackList[i] == callBack &&
                    thisObjectList[i] == thisObject) {//这里不能用===，因为有可能传入undefined和null.
                    return i;
                }
            }
            return -1;
        }

        /**
         * @private
         *
         */
        private concatTick(): void {
            this.callBackList = this.callBackList.concat();
            this.thisObjectList = this.thisObjectList.concat();
        }

        /**
         * 暂停心跳
         */
        public pause(): void {
            this.isPaused = true;
        }
        /**
         * 恢复心跳
         */
        public resume(): void {
            this.isPaused = false;
        }

        /**
         * @private
         * 执行一次刷新
         */
        public update(): void {
            let t1 = Date.now();

            let callBackList = this.callBackList;
            let thisObjectList = this.thisObjectList;
            let length = callBackList.length;

            let timeStamp = Date.now();

            if (this.isPaused) return;

            for (let i = 0; i < length; i++) {
                callBackList[i].call(thisObjectList[i], timeStamp);
            }

            let t2 = Date.now();

            this.costEnterFrame = t2 - t1;
        }
    }
    /**
    * 心跳计时器单例
    */
    export const ticker = new TimedTaskTicker();

    /**
     * @private
     * 启动心跳计时器。
     */
    export function startTimedTaskTicker(ticker: TimedTaskTicker): void {
        window.setTimeout(loop, 1000);

        function loop(): void {
            ticker.update();
            window.setTimeout(loop, 1000);
        }
    }
}