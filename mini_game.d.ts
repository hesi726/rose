declare namespace wx {
}

/**
 * 取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求
 */
declare function cancelAnimationFrame(): void;

/**
 * 在下次进行重绘时执行。
 */
declare function requestAnimationFrame(): number;

/**
 * 设定一个定时器，在定时到期以后执行注册的回调函数
 */
declare function setTimeout(): number;

/**
 * 可取消由 setTimeout() 方法设置的定时器。
 */
declare function clearTimeout(): void;

/**
 * 设定一个定时器，按照指定的周期（以毫秒计）来执行注册的回调函数
 */
declare function setInterval(): number;

/**
 * 可取消由 setInterval() 方法设置的定时器。
 */
declare function clearInterval(): void;

