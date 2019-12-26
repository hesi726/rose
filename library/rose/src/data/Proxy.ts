namespace rose {

    /**
     * 数据代理，控制类
     * @author Created by pony
     */
    export class Proxy<T> implements IProxy<T> {

        static RESET_DATA = 'reset_data';
        //默认不进行通知，由于性能原因，尽可能的不要除监听所有数据变化，尽量数据拆分详细
        static CHANGE_DATA = 'change_data';
        static CHANGE_DATA_KEY = 'change_data_';

        autoNotify: boolean; //自动通知
        autoNotifyAll: boolean;

        hasData = false;

        protected data: T;
        protected emitter: EventEmitter;

        constructor() {
            this._initProp();
        };

        protected _initProp(): void {
            this.autoNotify = true;
            this.autoNotifyAll = false;
            this.emitter = new EventEmitter();
        };

        //初始化数据尽量在这里写
        initialize(): void {

        };

        setData(data: T): IProxy<T> {
            this.data = data;
            this.hasData = true;
            return this;
        };

        getData(): T {
            return this.data;
        };

        /**
         * 设置指定并且通知
         * @param key 
         * @param value 
         */
        setValueAndNotify<K extends keyof T>(key: K, value: T[K]): void {

            this.data[key] = value;

            this.notifyEvent(Proxy.CHANGE_DATA_KEY + key);

            if (this.autoNotifyAll) {
                this.notifyEvent(Proxy.CHANGE_DATA);
            }
        };

        notifyEvent(eventName: string): void {

            if (!this.autoNotify) {
                return;
            }

            this.emitter.emit(eventName);
        };

        getValue<K extends keyof T>(key: K): T[K] {
            //考虑引用类型问题，外部不可更改
            return this.data[key];
        };

        getAll() {
            const results = {};
            return results;
        };

        register(selector: () => void, ctx: any): void {
            this.emitter.on(Proxy.CHANGE_DATA, selector, ctx);
        };

        unregister(selector: () => void, ctx: any): void {
            this.emitter.off(Proxy.CHANGE_DATA, selector, ctx);
        };

        registerByKey<K extends keyof T>(key: K, selector: () => void, ctx: any): void {
            this.emitter.on(Proxy.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterByKey<K extends keyof T>(key: K, selector: () => void, ctx: any): void {
            this.emitter.off(Proxy.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterAll(): void {
            this.emitter.removeAllListeners();
        };

        destroy(): void {
            this.unregisterAll();
        };
    }
}
