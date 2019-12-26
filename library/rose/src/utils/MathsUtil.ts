namespace MathsUtil {

    //=================== 代数工具 ===================

    /** 获取百分比*/
    export function numPercentage(curProgress: number, totalProgress: number, ratio: number): number {
        let value = Math.floor(curProgress / totalProgress * ratio);
        if (value > ratio) {
            value = ratio;
        };
        return value;
    };

    /** 
     * 给定 start 和 end 范围随机之间的整数，包括 start 和 end
     */
    export function rangeRandom(start: number, end: number): number {
        return clamp(Math.floor(Math.random() * (end - start + 1) + start), start, end);
    }

    export function clamp(e: number, t: number, i: number): number {
        return Math.min(Math.max(e, t), i)
    }

    //=================== 几何工具 ===================
    const R_T_D = 180 / Math.PI;
    const D_T_R = Math.PI / 180;

    /** 弧度转度*/
    export const radiansToDegrees = (radian: number) => radian * R_T_D;

    /** 度转弧度*/
    export const degreesToRadians = (deg: number) => deg * D_T_R;

    /** 根据向量转换角度*/
    export const pointAngle = (strat: egret.Point, end: egret.Point) => {
        return Math.atan2(end.y - strat.y, end.x - strat.x) * R_T_D;
    }

    /** 根据向量转换弧度*/
    export const pointRadians = (strat: egret.Point, end: egret.Point) => {
        return Math.atan2(end.y - strat.y, end.x - strat.x);
    }

    export const angleToSpeed = (t: number) => {
        const i = t * D_T_R;
        return new egret.Point(Math.cos(i), Math.sin(i));
    }

    /** 距离*/
    export const measureDistance = (p1: egret.Point, p2: egret.Point) => {
        return Math.sqrt((p1.x - (p2.x)) * (p1.x - (p2.x)) + (p1.y - (p2.y)) * (p1.y - (p2.y)));
    }

    export function radiansToSpeed(e) { return new egret.Point(Math.cos(e), Math.sin(e)) }

    export function angleSpeed(e, t) {
        var i = Math.atan2(t.y - e.y, t.x - e.x);
        return new egret.Point(Math.cos(i), Math.sin(i));
    }

    export function getCirclePoint(t, i, n) { var s = i * D_T_R; return t.add(new egret.Point(Math.cos(s) * n, Math.sin(s) * n)) }

    export function getCirclePoint2(e, t, i) { return e.add(new egret.Point(Math.cos(t) * i, Math.sin(t) * i)) }

    export function getBezierY(e, t) {
        if (void 0 === t && (t = 0), 0 > e || e > 1) return 0;
        if (0 > t || t > 1) return 0;
        var i = 0.5 - Math.sqrt((1 - t) / 4);
        var n = e * (1 - i) + i;
        return 4 * (n - 0.5) * (n - 0.5) - 1;
    }
}
