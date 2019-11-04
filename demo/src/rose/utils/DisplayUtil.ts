/**
 * 显示对象工具
 * @author Created by pony on 2019/01/01.
 */
namespace DisplayUtil {

    /** 删除显示对象、显示对象必须有父级容器*/
    export function removeFromParent(disObj: egret.DisplayObject): void {
        disObj && disObj.parent && disObj.parent.removeChild(disObj);
    }

    export function removeAllChildrenFromScratch(disContainer: egret.DisplayObjectContainer): void {
        while (disContainer.numChildren > 0) {
            disContainer.removeChildAt(0);
        }
    }

    /** 创建满屏遮罩 -- 废弃*/
    export function createMaskFull(color: number, alpha: number, isTouch = true): eui.Rect {
        return createMask(color, alpha, 750, 1336, isTouch);//后期优化取实际宽高
    }

    /** 创建遮罩 -- 废弃*/
    export function createMask(color: number, alpha: number, w: number, h: number, isTouch = false): eui.Rect {
        const rt = new eui.Rect(w, h, color);
        rt.alpha = alpha;
        rt.touchEnabled = isTouch;
        return rt;
    }

    /**  -- 废弃 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。*/
    export function createBitmapByName(name: string): egret.Bitmap {
        const result = new egret.Bitmap();
        const texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}