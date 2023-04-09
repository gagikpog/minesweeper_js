// import { Game } from './game.js';

import { ChanelEvents } from "../types";
import { Chanel } from "./chanel";

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
 */

interface IPointers {
    pointerId: number;
    clientX: number;
    clientY: number;
}

type TZoomCallback = (eventName: ChanelEvents, value: number) => void;
const chanel = 'zoomChanel';

export class Zoom {

    private _evCache: IPointers[] = [];
    private _prevDiff: number = -1;

    constructor() {
        this._initZoom();
    }

    private _initZoom(): void {
        const el = document.querySelector('body');

        if (el) {
            el.onpointerdown = (ev) => { this._evCache.push(ev); };
            el.onpointermove = this._pointermoveHandler;
        
            const pointerupHandler = () => {
                this._evCache = [];
                this._prevDiff = -1;
            };

            el.onpointerup = pointerupHandler;
            el.onpointercancel = pointerupHandler;
            el.onpointerout = pointerupHandler;
            el.onpointerleave = pointerupHandler;
        }
    }

    private _pointermoveHandler = (ev: PointerEvent) => {

        ev.preventDefault();

        for (var i = 0; i < this._evCache.length; i++) {
            if (ev.pointerId == this._evCache[i].pointerId) {
                this._evCache[i] = ev;
                break;
            }
        }

        if (this._evCache.length == 2) {
            const xDiff = this._evCache[0].clientX - this._evCache[1].clientX;
            const yDiff = this._evCache[0].clientY - this._evCache[1].clientY;
            const curDiff = Math.hypot(xDiff, yDiff);
            const deltaDiff = Math.abs(curDiff - this._prevDiff);

            if (this._prevDiff < 0) {
                this._prevDiff = curDiff;
            } else if (deltaDiff > 10) {
                this._notifyChanged(curDiff > this._prevDiff ? 1 : -1);
                this._prevDiff = curDiff;
            }

        } else {
            this._prevDiff = -1;
        }
    }

    private _notifyChanged(value: number): void {
        return Chanel.notify<number>(chanel, ChanelEvents.ZoomChange, value);
    }

    subscribeOnChange(callback: TZoomCallback): string {
        return Chanel.subscribe<number>(chanel, callback);
    }

    unsubscribeOnChange(subscribeId: string): boolean {
        return Chanel.unsubscribe(subscribeId);
    }
}
