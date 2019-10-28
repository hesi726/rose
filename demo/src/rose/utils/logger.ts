namespace logger {

    const noop = (...args) => { };

    export let log: (...args) => void = console.log.bind(console);
    export let debug: (...args) => void = console.debug.bind(console);
    export let info: (...args) => void = console.info.bind(console);
    export let warn: (...args) => void = console.warn.bind(console);
    export let error: (...args) => void = console.error.bind(console);

    /** 设置日志等级*/
    export function setLvl(lvl: number): void {
        if (lvl > 1) {
            log = noop;
            debug = noop;
        }
        if (lvl > 2) {
            info = noop;
        }
        if (lvl > 3) {
            warn = noop;
        }
        if (lvl > 4) {
            error = noop;
        }
    };
}