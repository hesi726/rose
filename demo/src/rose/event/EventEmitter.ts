namespace rose {

    export class EventEmitter {

        private _events = Object.create(null);

        private _eventsCount = 0;

        eventNames(): string[] {

            if (this._eventsCount === 0) return [];

            const events = this._events;

            // const names: Array<string> = Object.keys(events);

            // names.concat(Object.getOwnPropertySymbols(events));

            return Object.keys(events);
            // return names;

        };

        listeners(event: string) {

            const handlers = this._events[event];

            if (!handlers) return [];

            const ee = [];

            for (let i = 0, l = handlers.length; i < l; i++) {
                ee[i] = handlers[i].fn;
            }

            return ee;
        };

        listenerCount(event: string): number {
            const listeners = this._events[event];

            if (!listeners) return 0;
            return listeners.length;
        };

        emit(event: string, a1?: any, a2?: any, a3?: any, a4?: any, a5?: any): boolean {

            const listeners = this._events[event];

            if (!listeners) return false;

            for (let i = 0, length = listeners.length; i < length; i++) {

                switch (arguments.length) {
                    case 1: listeners[i].fn.call(listeners[i].context); break;
                    case 2: listeners[i].fn.call(listeners[i].context, a1); break;
                    case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
                    case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
                    case 5: listeners[i].fn.call(listeners[i].context, a1, a2, a3, a4); break;
                    case 6: listeners[i].fn.call(listeners[i].context, a1, a2, a3, a4, a5); break;
                    default:
                        console.error('>>>更多参数请使用数组实现!');
                }

                if (listeners[i].once) {
                    this.removeListener(event, listeners[i].fn, listeners[i].context);
                }
            }

            return true;
        };

        removeListener(event: string, fn?: Function, context?: any): void {

            const listeners = this._events[event];

            if (!listeners) return;

            if (!fn) {
                this._clearEvent(event);
                return;
            }

            for (let i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].fn === fn && listeners[i].context === context) {
                    listeners.splice(i, 1);
                    return;
                }
            }

        };

        on(event: string, fn: Function, context?: any): void {
            this._addListener(event, fn, context, false);
        };

        once(event: string, fn: Function, context?: any): void {
            this._addListener(event, fn, context, true);
        };

        removeAllListeners(event?: string): void {

            if (event) {
                if (this._events[event]) {
                    this._clearEvent(event);
                }
            } else {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }

        };

        off(event: string, fn?: Function, context?: any): void {
            this.removeListener(event, fn, context);
        }

        addListener(event: string, fn: Function, context?: any): void {
            this.on(event, fn, context);
        }

        private _addListener(event: string, fn: Function, context: any, once: boolean): void {

            if (typeof fn !== 'function') {
                throw new TypeError('The listener must be a function');
            }

            const listener = { fn, context, once }; // 优化时加入对象池功能

            let list = this._events[event];

            if (!list) {
                list = this._events[event] = [];
                this._eventsCount++;
            }

            list.push(listener);

        };

        private _clearEvent(event: string): void {
            --this._eventsCount;
            delete this._events[event];
        }

    }
}
