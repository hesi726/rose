namespace rose {

    interface IEvents {
        [evt: string]: Array<EE>;
    }

    /**
     * 事件接口
     */
    export interface IEventEmitter {

        _events: IEvents;

        _eventsCount: number;

        eventNames(): Array<string>;

        listeners(evt: string): Array<Function>;

        listenerCount(evt: string): number;

        emit(evt: string, ...args): boolean;

        on(event: string, fn: Function, context: any): IEventEmitter;

        once(event: string, fn: Function, context: any): IEventEmitter;

        removeListener(evt: string, fn: Function, context: any, once: boolean): IEventEmitter;

        removeAllListeners(event?: string): IEventEmitter;

        off(evt: string, fn: Function, context: any, once: boolean): IEventEmitter;

        addListener(event: string, fn: Function, context: any): IEventEmitter;
    }

    class EE {
        public fn: Function;
        public context: any;
        public once: boolean;

        constructor(fn: Function, context: any, once: boolean) {
            this.fn = fn;
            this.context = context;
            this.once = once;
        }
    }

    /**
     * Add a listener for a given event.
     * @private
     */
    function addListener(emitter: IEventEmitter, evt: string, fn: Function, context: any = null, once = false): IEventEmitter {

        const listener = new EE(fn, context || emitter, once);

        if (!Array.isArray(emitter._events[evt])) {
            emitter._events[evt] = [];
            emitter._eventsCount++;
        }

        emitter._events[evt].push(listener);

        return emitter;
    }

    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String)} evt The Event name.
     * @private
     */
    function clearEvent(emitter: EventEmitter, evt: string) {
        if (--emitter._eventsCount === 0) {
            emitter._events = {};
        } else {
            delete emitter._events[evt];
        }
    }

    export class EventEmitter implements IEventEmitter {

        public _events: IEvents;

        public _eventsCount: number;

        constructor() {
            this._events = {};
            this._eventsCount = 0;
        }

        /**
         * Return an array listing the events for which the emitter has registered
         * listeners.
         *
         * @returns {Array<string>}
         * @public
         */
        eventNames(): Array<string> {
            let names: Array<string> = [];
            const events = this._events;

            if (this._eventsCount === 0) return names;

            names = Object.keys(events);

            return names;
        };


        /**
         * Return the listeners registered for a given event.
         *
         * @param {String} evt The event name.
         * @returns {Array<Function>} The registered listeners.
         * @public
         */
        listeners(evt: string): Array<Function> {
            const handlers = this._events[evt];

            if (!handlers) return [];

            const ee = [];

            for (let i = 0, l = handlers.length; i < l; i++) {
                ee[i] = handlers[i].fn;
            }

            return ee;
        };

        /**
         * Return the number of listeners listening to a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @returns {Number} The number of listeners.
         * @public
         */
        listenerCount(evt: string): number {
            const listeners = this._events[evt];

            if (!listeners) return 0;
            return listeners.length;
        };

        /**
         * Calls each of the listeners registered for a given event.
         *
         * @param {string} event The event name.
         * @returns {Boolean} `true` if the event had listeners, else `false`.
         * @public
         */
        emit(evt: string, ...args): boolean {

            if (!this._events[evt]) return false;

            const listeners = this._events[evt];

            const length = listeners.length;

            for (let i = 0; i < length; i++) {
                if (listeners[i].once) {
                    this.removeListener(evt, listeners[i].fn, listeners[i].context, true);
                }

                listeners[i].fn.apply(listeners[i].context, args);

            }

            return true;
        };

        /**
          * Add a listener for a given event.
          *
          * @param {(String|Symbol)} event The event name.
          * @param {Function} fn The listener function.
          * @param {*} [context=this] The context to invoke the listener with.
          * @returns {EventEmitter} `this`.
          * @public
          */
        on(event: string, fn: Function, context: any): IEventEmitter {
            return addListener(this, event, fn, context, false);
        };

        /**
          * Add a one-time listener for a given event.
          *
          * @param {(String|Symbol)} event The event name.
          * @param {Function} fn The listener function.
          * @param {*} [context=this] The context to invoke the listener with.
          * @returns {EventEmitter} `this`.
          * @public
          */
        once(event: string, fn: Function, context: any): IEventEmitter {
            return addListener(this, event, fn, context, true);
        };

        /**
         * Remove the listeners of a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @param {Function} fn Only remove the listeners that match this function.
         * @param {*} context Only remove the listeners that have this context.
         * @param {Boolean} once Only remove one-time listeners.
         * @returns {EventEmitter} `this`.
         * @public
         */
        removeListener(evt: string, fn: Function, context: any, once: boolean): IEventEmitter {

            if (!this._events[evt]) return this;

            if (!fn) {
                clearEvent(this, evt);
                return this;
            }

            const listeners = this._events[evt];

            for (var i = 0, events = [], length = listeners.length; i < length; i++) {
                if (
                    listeners[i].fn !== fn ||
                    (once && !listeners[i].once) ||
                    (context && listeners[i].context !== context)
                ) {
                    events.push(listeners[i]);
                }
            }

            if (events.length) {
                this._events[evt] = events;
            } else {
                clearEvent(this, evt);
            }

            return this;
        };

        /**
         * Remove all listeners, or those of the specified event.
         *
         * @param {(String)} [event] The event name.
         * @returns {EventEmitter} `this`.
         * @public
         */
        removeAllListeners(event?: string): IEventEmitter {

            if (event) {
                if (this._events[event]) clearEvent(this, event);
            } else {
                this._events = {};
                this._eventsCount = 0;
            }

            return this;
        };

        /**
         * Alias methods names because people roll like that.
         * 
         * @param evt 
         * @param fn 
         * @param context 
         * @param once 
         */
        off(evt: string, fn: Function, context: any, once = false): IEventEmitter {
            return this.removeListener(evt, fn, context, once);
        }

        addListener(event: string, fn: Function, context: any): IEventEmitter {
            return this.on(event, fn, context);
        }
    }
}
