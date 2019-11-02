namespace rose {

    export class Res {

        _initProp() {

        }

        async getStatusRes(res: string): Promise<any> {
            let result = RES.getRes(res);
            if (result) {
                return Promise.resolve(result);
            }

            return RES.getResAsync(res);
        }

    }

    export let R = new Res();
}
