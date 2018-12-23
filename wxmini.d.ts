/**
 * 取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求
 */
declare function cancelAnimationFrame(requestID: number): void;

/**
 * 在下次进行重绘时执行。
 */
declare function requestAnimationFrame(callback: () => void): number;

interface Console {
    debug(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(groupTitle?: string, ...optionalParams: any[]): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

declare var Console: {
    prototype: Console;
    new(): Console;
};

declare var console: Console;
/**
 * 可取消由 setTimeout() 方法设置的定时器。
 */
declare function clearTimeout(timeoutID: number): void;

/**
 * 可取消由 setInterval() 方法设置的定时器。
 */
declare function clearInterval(intervalID: number): void;

/**
 * 设定一个定时器，在定时到期以后执行注册的回调函数
 * @param callback 回调函数
 * @param delay 延迟的时间，函数的调用会在该延迟之后发生，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @returns number定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setTimeout(callback: () => void, delay: number, ...rest): number;

/**
 * 设定一个定时器，按照指定的周期（以毫秒计）来执行注册的回调函数
 * @param callback 回调函数
 * @param delay 执行回调函数之间的时间间隔，单位 ms。
 * @param rest param1, param2, ..., paramN 等附加参数，它们会作为参数传递给回调函数。
 * @returns number定时器的编号。这个值可以传递给 clearTimeout 来取消该定时。
 */
declare function setInterval(callback: () => void, delay: number, ...rest): number;

/**
 * 微信小游戏命名空间
 */
declare namespace wx {

    type systemInfo = {
        /** 手机品牌*/
        brand: string;
        /** 手机型号*/
        model: string;
        /**	设备像素比 */
        pixelRatio: number;
        /** 屏幕宽度*/
        screenWidth: number;
        /** 屏幕高度*/
        screenHeight: number;
        /** 可使用窗口宽度*/
        windowWidth: number;
        /** 可使用窗口高度*/
        windowHeight: number;
        /** 状态栏的高度*/
        statusBarHeight: number;
        /** 微信设置的语言*/
        language: string;
        /** 微信版本号*/
        version: string;
        /** 操作系统版本*/
        system: string;
        /** 客户端平台*/
        platform: string
        /** 用户字体大小设置。以“我-设置 - 通用 - 字体大小”中的设置为准，单位 px。*/
        fontSizeSetting: number;
        /** 客户端基础库版本*/
        SDKVersion: string;
        /** 性能等级*/
        benchmarkLevel: number;
    }

    type launchOption = {
        /** 启动小游戏的场景值*/
        scene: number;
        /** 启动小游戏的 query 参数	*/
        query: Object;
        /** 当前小游戏是否被显示在聊天顶部*/
        referrerInfo: ReferrerInfo
        /** shareTicket，详见获取更多转发信息*/
        shareTicket: string;
    }

    type ReferrerInfo = {
        /** 来源小程序或公众号或App的 appId	*/
        appId: string,
        /**  来源小程序传过来的数据，scene=1037或1038时支持*/
        extraData: any
    }

    /**
     * UpdateManager 对象，用来管理更新，可通过 wx.getUpdateManager 接口获取实例。
     */
    type UpdateManager = {
        /**
         * 强制小程序重启并使用新版本。在小程序新版本下载完成后（即收到 onUpdateReady 回调）调用。
         */
        applyUpdate(): void;
        /**
         * 监听向微信后台请求检查更新结果事件。微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
         * @param callback 向微信后台请求检查更新结果事件的回调函数
         */
        onCheckForUpdate(callback: (res: { hasUpdate: boolean }) => void): void;
        /**
         * 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
         * @param callback 小程序有版本更新事件的回调函数
         */
        onUpdateReady(callback: () => void): void;
        /**
         * 监听小程序更新失败事件。小程序有新版本，客户端主动触发下载（无需开发者触发），下载失败（可能是网络原因等）后回调
         * @param callback 小程序更新失败事件的回调函数
         */
        onUpdateFailed(callback: () => void): void;
    }

    /**
     * 在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。
     */
    type Touch = {
        /** Touch 对象的唯一标识符，只读属性。一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程。*/
        identifier: number
        /** 触点相对于屏幕左边沿的 X 坐标。*/
        screenX: number
        /** 触点相对于屏幕上边沿的 Y 坐标。*/
        screenY: number
    }

    /**
     * 性能管理器
     */
    type Performance = {
        /**
         * 可以获取当前时间以微秒为单位的时间戳
         */
        now(): number;
    }

    /**
     * 加载分包任务实例，用于获取分包加载状态
     */
    type LoadSubpackageTask = {
        /**
         * 监听分包加载进度变化事件
         * @param callback 分包加载进度变化事件的回调函数
         */
        onProgressUpdate(callback: (res: {
            /** 分包下载进度百分比*/
            progress: number
            /** 已经下载的数据长度，单位 Bytes	*/
            totalBytesWritten: number
            /** 预期需要下载的数据总长度，单位 Bytes*/
            totalBytesExpectedToWrite: number
        }) => void): void
    }

    /**
     * 通过 Canvas.getContext('2d') 接口可以获取 CanvasRenderingContext2D 对象，实现了 HTML Canvas 2D Context 定义的大部分属性、方法。
     * 通过 Canvas.getContext('webgl') 接口可以获取 WebGLRenderingContext 对象，实现了 WebGL 1.0 定义的所有属性、方法、常量。
     * 2d 接口支持情况
     * iOS/Android 不支持的 2d 属性和接口

     * globalCompositeOperation 不支持以下值： source-in source-out destination-atop lighter copy。如果使用，不会报错，但是将得到与预期不符的结果。
     * isPointInPath
     * WebGL 接口支持情况
     * iOS/Android 不支持的 WebGL 接口

     * pixelStorei 当第一个参数是 gl.UNPACK_COLORSPACE_CONVERSION_WEBGL 时
     * compressedTexImage2D
     * compressedTexSubImage2D
     * 除此之外 Android 还不支持 WebGL 接口

     * getExtension
     * getSupportedExtensions
     */
    interface RenderingContext { }

    interface Canvas {
        /** 画布的宽度*/
        width: number;
        /** 画布的高度*/
        height: number;

        /**
         * 获取画布对象的绘图上下文
         */
        getContext(contextType: '2d' | 'webgl', contextAttributes: { antialias?: false, preserveDrawingBuffer?: false, antialiasSamples?: 2 }): RenderingContext;
        /**
         * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
         */
        toTempFilePath(object: { x?: number, y?: number, width?: number, height?: number, destWidth?: number, destHeight?: number, fileType?: 'jpg' | 'png', quality?: number, success?: (res?: any) => void, fail?: (err?: any) => void, complete?: (res?: any) => void }): string;
        /**
         * 把画布上的绘制内容以一个 data URI 的格式返回
         */
        toDataURL(): string;
        /**
         * Canvas.toTempFilePath 的同步版本
         */
        toTempFilePathSync(object: { x?: number, y?: number, width?: number, height?: number, destWidth?: number, destHeight?: number, fileType?: 'jpg' | 'png', quality?: number }): void;
    }

    /**
     * 获取系统信息
     */
    function getSystemInfo(object: { success: (res?: systemInfo) => void, fail: (err?: any) => void, complete: (res?: any) => void }): void;

    /**
     * wx.getSystemInfo 的同步版本
     */
    function getSystemInfoSync(): systemInfo;

    /**
     * 返回值 UpdateManager
     */
    function getUpdateManager(): UpdateManager;

    /**
     * 退出当前小游戏
     */
    function exitMiniProgram(object: { success?: () => void, fail?: () => void, complete?: () => void }): void;

    /**
    * 返回小程序启动参数
    */
    function getLaunchOptionsSync(): launchOption;
    /**
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function onHide(callback: () => void): void;
    /**
     * 取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    function offHide(callback: () => void): void;
    /**
     * 监听小游戏回到前台的事件
     */
    function onShow(callback: (res: {
        /** 场景值*/
        scene: string,
        /** 查询参数*/
        query: any,
        /** shareTicket*/
        shareTicket: string,
        /** 当场景为由从另一个小程序或公众号或App打开时，返回此字段*/
        referrerInfo: ReferrerInfo
    }) => void): void;
    /**
     * 取消监听小游戏回到前台的事件
     */
    function offShow(callback: () => void): void;

    /**
    * 监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
    */
    function onAudioInterruptionEnd(callback: () => void): void;
    /**
     * 取消监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     */
    function offAudioInterruptionEnd(callback: () => void): void;
    /**
     * 监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    function onAudioInterruptionBegin(callback: () => void): void;
    /**
     * 取消监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    function offAudioInterruptionBegin(callback: () => void): void;
    /**
     * 监听全局错误事件
     */
    function onError(callback: (res: {
        /** 错误*/
        message: string,
        /** 错误调用堆栈*/
        stack: string
    }) => void): void;
    /**
     * 取消监听全局错误事件
     */
    function offError(callback: () => void): void;

    /**
     * 监听开始触摸事件
     */
    function onTouchStart(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听开始触摸事件
     */
    function offTouchStart(callback: () => void): void;
    /**
     * 监听触点移动事件
     */
    function onTouchMove(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触点移动事件
     */
    function offTouchMove(callback: () => void): void;
    /**
     * 监听触摸结束事件
     */
    function onTouchEnd(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触摸结束事件
     */
    function offTouchEnd(callback: () => void): void;
    /**
     * 监听触点失效事件
     */
    function onTouchCancel(callback: (res: {
        /** 当前所有触摸点的列表*/
        touches: Array<Touch>,
        /** 触发此次事件的触摸点列表*/
        changedTouches: Array<Touch>,
        /** 事件触发时的时间戳*/
        timeStamp: number
    }) => void): void;
    /**
     * 取消监听触点失效事件
     */
    function offTouchCancel(callback: () => void): void;

    /**
    * 获取性能管理器
    */
    function getPerformance(): Performance;
    /**
     * 加快触发 JavaScrpitCore Garbage Collection（垃圾回收），GC 时机是由 JavaScrpitCore 来控制的，并不能保证调用后马上触发 GC。
     */
    function triggerGC(): void;

    /**
     *  基础库 2.1.0 开始支持，低版本需做兼容处理。
     *  触发分包加载，详见 分包加载
     */
    function loadSubpackage(res: {
        /** 分包的名字，可以填 name 或者 root*/
        name: () => void,
        /** 分包加载成功回调事件*/
        success: () => void,
        /** 分包加载失败回调事件*/
        fail: () => void,
        /** 分包加载结束回调事件(加载成功、失败都会执行）*/
        complete: () => void
    }): LoadSubpackageTask;

    /**
     * 基础库 1.4.0 开始支持，低版本需做兼容处理。
     * 设置是否打开调试开关。此开关对正式版也能生效。
     */
    function setEnableDebug(res: {
        /** 是否打开调试*/
        enableDebug: boolean,
        /** 接口调用成功的回调函数*/
        success?: () => void,
        /** 接口调用失败的回调函数*/
        fail?: () => void,
        /** 接口调用结束的回调函数（调用成功、失败都会执行）*/
        complete?: () => void
    }): void;

    /**
     * 创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。
     */
    function createCanvas(): Canvas;

    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     */
    function setPreferredFramesPerSecond(fps: number): void;

    /**
     * 获取一行文本的行高
     * @returns number 文本的行高
     */
    function getTextLineHeight(object: { fontStyle?: 'normal' | 'italic', fontWeight?: 'normal' | 'bold', fontSize?: 16, fontFamily: string, text: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): number;
    /**
     * 加载自定义字体文件
     * @returns string 如果加载字体成功，则返回字体 family 值，否则返回 null。
     */
    function loadFont(path: string): string;


    interface Image {
        /**
         * 图片的 URL
         */
        src: string;
        /**
        * 图片的真实宽度
        */
        width: number;
        /**
        * 图片的真实高度
        */
        height: number;
        /**
         * 图片的加载完成
         */
        onload: (res?: any) => void;
        /**
         * 图片加载发生错误后触发的回调函数
         */
        onerror: (res?: any) => void;
    }

    /**
     * 创建一个图片对象
     */
    function createImage(): Image;

    /**
     * banner 广告组件。banner 广告组件是一个原生组件，层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。banner 广告组件默认是隐藏的，需要调用 BannerAd.show() 将其显示。banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的尺寸将通过 BannerAd.onResize() 事件中提供。
     */
    interface BannerAd {
        /**
         * banner 广告组件的样式。style 上的属性的值仅为开发者设置的值，banner 广告会根据开发者设置的宽度进行等比缩放，缩放后的真实尺寸需要通过 BannerAd.onResize() 事件获得。
         */
        style: {
            /** banner 广告组件的左上角横坐标*/
            left: number,
            /** banner 广告组件的左上角纵坐标*/
            top: number,
            /** banner 广告组件的宽度。最小 300，最大至 屏幕宽度（屏幕宽度可以通过 wx.getSystemInfoSync() 获取）。*/
            width: number,
            /** banner 广告组件的高度*/
            height: number,
            /** banner 广告组件经过缩放后真实的宽度*/
            realWidth: number,
            /** banner 广告组件经过缩放后真实的高度*/
            realHeight: number
        };

        /** 显示 banner 广告。*/
        show(): Promise<any>;
        /** 隐藏 banner 广告*/
        hide(): void;
        /** 销毁 banner 广告*/
        destroy(): void;
        /** 监听 banner 广告尺寸变化事件*/
        onResize(callback: (res: { width: number, height: number }) => void): void;
        /** 取消监听 banner 广告尺寸变化事件*/
        offResize(callback: () => void): void;
        /** 监听 banner 广告加载事件*/
        onLoad(callback: () => void): void;
        /** 取消监听 banner 广告加载事件*/
        offLoad(callback: () => void): void;
        /** 监听 banner 广告错误事件*/
        onError(callback: (res: { errMsg: string, errCode: 1000 | 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 }) => void): void;
        /** 取消监听 banner 广告错误事件*/
        offError(callback: () => void): void;
    }

    /**
     * 激励视频广告组件。激励视频广告组件是一个原生组件，并且是一个全局单例。层级比上屏 Canvas 高，会覆盖在上屏 Canvas 上。激励视频 广告组件默认是隐藏的，需要调用 RewardedVideoAd.show() 将其显示。
     */
    interface RewardedVideoAd {
        /** 隐藏激励视频广告*/
        load(): Promise<any>;
        /** 显示激励视频广告。激励视频广告将从屏幕下方推入。*/
        show(): Promise<any>;
        /** 销毁 banner 广告*/
        destroy(): void;
        /** 监听 banner 广告尺寸变化事件*/
        onResize(callback: (res: { width: number, height: number }) => void): void;
        /** 取消监听 banner 广告尺寸变化事件*/
        offResize(callback: () => void): void;
        /** 监听激励视频广告加载事件*/
        onLoad(callback: () => void): void;
        /** 取消监听激励视频广告加载事件*/
        offLoad(callback: () => void): void;
        /** 监听激励视频错误事件*/
        onError(callback: (res: { errMsg: string, errCode: 1000 | 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 }) => void): void;
        /** 取消监听激励视频错误事件*/
        offError(callback: () => void): void;
        /** 监听用户点击 关闭广告 按钮的事件*/
        onClose(callback: (res: { isEnded: boolean }) => void);
        /** 取消监听用户点击 关闭广告 按钮的事件*/
        offClose(callback: () => void);
    }

    /**
     * 创建激励视频广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    function createRewardedVideoAd(res: { adUnitId: string }): RewardedVideoAd;

    /**
     * 创建 banner 广告组件。请通过 wx.getSystemInfoSync() 返回对象的 SDKVersion 判断基础库版本号 >= 2.0.4 后再使用该 API。同时，开发者工具上暂不支持调试该 API，请直接在真机上进行调试。
     */
    function createBannerAd(res: {
        adUnitId: string, style: {
            left: number,
            top: number,
            width: number,
            height: number
        }
    }): BannerAd;

    /**
     * 显示操作菜单
     */
    function showActionSheet(object: { itemList: string[], itemColor?: string, success?: (res?: { tapIndex: number }) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 隐藏 loading 提示框*/
    function hideLoading(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /** 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框*/
    function showLoading(object: { title: string, mask?: false, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 隐藏消息提示框*/
    function hideToast(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 显示消息提示框*/
    function showToast(object: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: 1500, mask?: false, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 显示模态对话框
     */
    function showModal(object: {
        title: string,
        content: string,
        showCancel?: true,
        cancelText?: '取消',
        cancelColor?: '#000000',
        confirmText?: '确定',
        confirmColor?: '#3cc51f',
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 基础库 2.1.0 开始支持，低版本需做兼容处理。更新键盘输入框内容。只有当键盘处于拉起状态时才会产生效果
     */
    function updateKeyboard(res: {
        value: string,
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;

    /**
     * 隐藏键盘
     */
    function hideKeyboard(object: { success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
    * 显示键盘
    */
    function showKeyboard(object: { defaultValue: string, maxLength: number, multiple: boolean, confirmHold: boolean, confirmType: 'done' | 'next' | 'search' | 'go' | 'send', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /**
     * 监听键盘输入事件
     */
    function onKeyboardInput(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听键盘输入事件
     */
    function offKeyboardInput(callback: () => void): void;
    /**
     * 监听用户点击键盘 Confirm 按钮时的事件
     */
    function onKeyboardConfirm(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听用户点击键盘 Confirm 按钮时的事件
     */
    function offKeyboardConfirm(callback: () => void): void;
    /**
     * 监听监听键盘收起的事件
     */
    function onKeyboardComplete(callback: (res: { value: string }) => void): void;
    /**
     * 取消监听监听键盘收起的事件
     */
    function offKeyboardComplete(callback: () => void): void;

    /** 基础库 2.1.0 开始支持，低版本需做兼容处理。获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。*/
    function getMenuButtonBoundingClientRect(): {
        width: number,
        height: number,
        top: number,
        right: number,
        bottom: number,
        left: number
    };

    /** 动态设置通过右上角按钮拉起的菜单的样式。*/
    function setMenuStyle(res: { style: 'light' | 'dark', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /** 当在配置中设置 showStatusBarStyle 时，屏幕顶部会显示状态栏。此接口可以修改状态栏的样式。*/
    function setStatusBarStyle(res: { style: 'white' | 'black', success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

    /**
     * 监听窗口尺寸变化事件
     */
    function onWindowResize(callback: (res: { windowWidth: number, windowHeight: number }) => void): void;
    /**
     * 取消监听窗口尺寸变化事件
     */
    function offWindowResize(callback: () => void): void;

    interface RequestTask {
        abort(): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 发起网络请求。
     */
    function request(object: {
        url: string,
        data?: string | object | ArrayBuffer,
        header?: Object,
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
        dataType?: 'json',
        responseType: 'text',
        success?: (res?: {
            data: string | Object | ArrayBuffer,
            statusCode: number,
            header: Object
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): RequestTask;


    interface DownloadTask {
        abort(): void;

        /** 监听下载进度变化事件*/
        onProgressUpdate(callback: (res: {
            progress: number,
            totalBytesWritten: number,
            totalBytesExpectedToWrite: number
        }) => void): void;

        /** 取消监听下载进度变化事件*/
        offProgressUpdate(callback: () => void): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地文件路径。
     */
    function downloadFile(object: {
        url: string,
        header?: Object,
        filePath?: string,
        success?: (res?: {
            tempFilePath: string,
            statusCode: number
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): DownloadTask;

    interface UploadTask {
        /** 中断上传任务*/
        abort(): void;
        /** 监听上传进度变化事件*/
        onProgressUpdate(callback: (res: {
            progress: number,
            totalBytesSent: number,
            totalBytesExpectedToSend: number
        }) => void): void;
        /** 取消监听上传进度变化事件*/
        offProgressUpdate(callback: () => void): void;
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早*/
        onHeadersReceived(callback: (res: { header: Object }) => void): void;
        /** 取消监听 HTTP Response Header 事件*/
        offHeadersReceived(callback: () => void): void;
    }

    /**
     * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data 。
     */
    function uploadFile(object: {
        url: string,
        filePath: string,
        name: string,
        header?: Object,
        formData?: Object,
        success?: (res?: {
            data: string,
            statusCode: number
        }) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): UploadTask;

    interface SocketTask {
        /**
         * 关闭 WebSocket 连接
         */
        close(object: { code?: 1000, reason?: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
        /**
         * 监听WebSocket 连接打开事件
         */
        onOpen(callback: (res: { header: Object }) => void): void;
        /**
         * 监听WebSocket 连接关闭事件
         */
        onClose(callback: () => void): void;
        /**
         * 监听WebSocket 错误事件
         */
        onError(callback: (res: { errMsg: string }) => void): void;
        /**
         * 监听WebSocket 接受到服务器的消息事件
         */
        onMessage(callback: (res: { data: string | ArrayBuffer }) => void): void;
        /**
         * 通过 WebSocket 连接发送数据
         */
        send(object: { data: string | ArrayBuffer, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    }

    /**
     * 监听WebSocket 错误事件
     */
    function onSocketError(callback: (err?: any) => void): void;

    /**
     * 创建一个 WebSocket 连接。
     */
    function connectSocket(object: { url: string, header?: Object, protocols: Array<string>, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): SocketTask;
    /**
     * 关闭 WeSocket 连接
     */
    function closeSocket(object: { code?: 1000, reason?: string, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    /**
     * 监听WebSocket 连接打开事件
     */
    function onSocketOpen(callback: (res: { header: object }) => void): void;
    /**
     * 监听WebSocket 连接关闭事件
     */
    function onSocketClose(callback: () => void): void;
    /**
     * 监听WebSocket 接受到服务器的消息事件
     */
    function onSocketMessage(callback: (res: { data: string | ArrayBuffer }) => void): void;
    /**
     * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
     */
    function sendSocketMessage(object: { data: string | ArrayBuffer, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;

}


// /**
//  * 基础库 2.0.0 开始支持，低版本需做兼容处理。
//  * 将一个 Canvas 对应的 Texture 绑定到 WebGL 上下文。
//  */
// declare var WebGLRenderingContext: {
//     /**
//      * 
//      * @param texture WebGL 的纹理类型枚举值
//      * @param canvas 需要绑定为 Texture 的 Canvas
//      */
//     wxBindCanvasTexture: (texture: number, canvas: wx.Canvas) => void
// }
