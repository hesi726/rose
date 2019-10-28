class MyUtil {

    /**
     * 获取对象类名
     * @param target
     * @returns {any}
     */
    public static getClassName(target: any): string {
        return target.__proto__.__class__;
    }

    /** 删除元素*///d--
    public static removeByElements(arr, element) {
        var index = -1;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i] == element) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }

    /** 获取百分比*///d--
    public static numPrecentage(cint: number, mint: number, countCop: number): number {
        var value: number = Math.floor(cint / mint * countCop);
        if (value > countCop) {
            value = countCop;
        };
        return value;
    };

    /** 将秒转化为时分秒 */
    public static countDownStr(num: number): string {
        //   conversion
        var timerStr = "";
        var h: number = Math.floor(num / 3600);
        timerStr = h > 0 ? h + ":" : "00:";
        var m: number = Math.floor((num - h * 3600) / 60);
        timerStr += m >= 10 ? "" + m + ":" : "0" + m + ":";
        var s: number = Math.floor((num - h * 3600 - m * 60) / 1);
        timerStr += s >= 10 ? "" + s : "0" + s;
        return timerStr;
    }

    /** 
     * 给定 start 和 end 范围随机之间的整数，包括 start 和 end
     */
    public static rangeRandom(start: number, end: number): number {
        return this.clamp(Math.floor(Math.random() * (end - start + 1) + start), start, end);
    }

    public static clamp(e: number, t: number, i: number): number {
        return Math.min(Math.max(e, t), i)
    }

}