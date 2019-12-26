namespace rose {

    export interface IDialogEffect {
        (dialog: egret.DisplayObjectContainer, onEnd: () => void): void;
    }

    /** 打开弹窗特效*/
    export const dialogShowEaseBackOut: IDialogEffect = (dialog: egret.DisplayObjectContainer, onEnd: () => void) => {
        const dialogWidth = dialog.width;
        const dialogHeight = dialog.height;
        dialog.alpha = 0;
        dialog.scaleX = 0.5;
        dialog.scaleY = 0.5;
        dialog.x = dialog.x + dialogWidth / 4;
        dialog.y = dialog.y + dialogHeight / 4;
        egret.Tween.get(dialog).to(
            {
                alpha: 1,
                scaleX: 1,
                scaleY: 1,
                x: dialog.x - dialogWidth / 4,
                y: dialog.y - dialogHeight / 4
            },
            300,
            egret.Ease.backOut
        ).call(onEnd);
    }

    /** 默认关闭特效*/
    export const dialogCloseDefault: IDialogEffect = (dialog: egret.DisplayObjectContainer, onEnd: () => void) => {
        egret.Tween.get(dialog).to(
            {
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                x: dialog.x + dialog.width / 2,
                y: dialog.y + dialog.height / 2
            },
            300
        ).call(onEnd);
    }

}
