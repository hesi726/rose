declare const awx: {
    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     */
    setPreferredFramesPerSecond(fps: number): void;
    /**
     * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听。
     */
    onAccelerometerChange(callback: ()=>void): void;
    startAccelerometer(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    stopAccelerometer(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    /**
     * 获取设备电量
     */
    getBatteryInfo(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    /**
     * wx.getBatteryInfo 的同步版本
     */
    getBatteryInfoSync(): string;
    getClipboardData(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    setClipboardData(object: {data:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    /**
     * 监听罗盘数据，频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
     */
    onCompassChange(callback: ()=>void): void;
    startCompass(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    stopCompass(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    /**
     * 获取网络类型
     */
    getNetworkType(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    onNetworkStatusChange(callback: ()=>void): void;
    getScreenBrightness(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    setKeepScreenOn(object: {keepScreenOn:boolean,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    setScreenBrightness(object: {value:number,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    vibrateShort(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    vibrateLong(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    authorize(object: {scope:string,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    getSetting(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    openSetting(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    getWeRunData(object: {success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
    setEnableDebug(object: {enableDebug:boolean,success:(res:any)=>void,fail:(res:any)=>void,complete:(res:any)=>void}): void;
}