import { ChanelEvents } from "../types";

type TCallback<T = any> = (eventName: ChanelEvents, data: T) => void;
type TSubscribeData<T = any> = {id: string, callback: TCallback<T>}

export class Chanel {

    static _chanelMap: {[chanelName: string]: TSubscribeData[]} = {};

    static notify<DataType>(chanel: string, eventName: ChanelEvents, data: DataType): void {
        this._chanelMap?.[chanel]?.forEach((item) => {
            item.callback(eventName, data);
        });
    }

    static subscribe<DataType>(chanel: string, callback: TCallback<DataType>): string {

        this._checkValidKey(chanel);

        this._chanelMap = this._chanelMap || {};
        this._chanelMap[chanel] = this._chanelMap[chanel] || [];

        const dataArray: TSubscribeData[] = this._chanelMap[chanel];

        const isSubscribed = dataArray.find((data: TSubscribeData) => {
            return data.callback === callback;
        });

        if (isSubscribed) {
            throw new Error(`Callback already subscribed to chanel: "${chanel}"`);
        }

        const subscribeId = `${chanel}->${Math.random()}`;

        dataArray.push({
            id: subscribeId,
            callback
        });

        return subscribeId;
    }

    static unsubscribe(subscribeId: string): boolean {
        const [chanel] = subscribeId.split('->');
        const dataArray = this._chanelMap?.[chanel];
        if (dataArray?.length) {
            const oldLength = dataArray.length;
            this._chanelMap[chanel] = dataArray.filter((item) => {
                item.id !== subscribeId;
            });
            const newLength = this._chanelMap[chanel].length;
            return oldLength !== newLength;
        }
        return false;
    }

    static _checkValidKey(key: string): void {
        if (key?.search('->') !== -1) {
            throw new Error(`invalid key: "${key}"`);
        }
    }
}
