namespace rose {
    /**
     * 数据代理，控制类
     */
    export class Proxy<T> implements IProxy<T> {

        // static CHANGE_DATA = 'change_data';//由于性能问题去除监听所有数据变化
        static CHANGE_DATA_KEY = 'change_data_';

        protected data: T;
        protected emitter: EventEmitter;

        constructor() {
            this._initProp();
        }

        /**
         * 
         * @override
         */
        protected _initProp(): void {
            this.emitter = new EventEmitter();
        }

        /**
         * 
         * @override
         */
        initData(): void {

        }

        setData(data: T): IProxy<T> {
            this.data = data;
            return this;
        }

        getData(): T {
            return this.data;
        }

        setValue<K extends keyof T>(key: K, value: T[K]): void {

            this.data[key] = value;

            // this.emitter.emit(Proxy.CHANGE_DATA, this.data);

            if (Array.isArray(value)) {
                this.emitter.emit(Proxy.CHANGE_DATA_KEY + key, (<Array<any>>value).concat());
                return;
            }

            //注意 null 问题
            if (typeof value === 'object') {
                this.emitter.emit(Proxy.CHANGE_DATA_KEY + key, Object.assign({}, value));
                return;
            }

            this.emitter.emit(Proxy.CHANGE_DATA_KEY + key, value);
        };

        getValue<K extends keyof T>(key: K): T[K] {
            //考虑引用类型问题，外部不可更改
            return this.data[key];
        };

        getAll() {
            const results = {};

            return results;
        };

        register(selector: (data: T) => void, ctx: any): void {
            // this.emitter.on(Proxy.CHANGE_DATA, selector, ctx);
        };

        unregister(selector: (data: T) => void, ctx: any): void {
            // this.emitter.off(Proxy.CHANGE_DATA, selector, ctx, false);
        };

        registerByKey<K extends keyof T>(key: K, selector: (value: T[K]) => void, ctx: any): void {
            this.emitter.on(Proxy.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterByKey<K extends keyof T>(key: K, selector: (value: T[K]) => void, ctx: any): void {
            this.emitter.off(Proxy.CHANGE_DATA_KEY + key, selector, ctx, false);
        };

        unregisterAll(): void {
            this.emitter.removeAllListeners();
        };
    }
}
