namespace rose {

    export class GameEventChannel extends EventEmitter {
        static AFTER_CONFIG = "afterConfig";
        static AFTER_MAIN = "afterMain";
    }

    export const gameEventChannel = new GameEventChannel();
}
