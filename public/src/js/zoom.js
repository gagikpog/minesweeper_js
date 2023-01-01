import { Game } from './game.js';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
 */

let evCache = [];
let prevDiff = -1;

initZoom();

function initZoom() {
    const el = document.querySelector("body");

    el.onpointerdown = (ev) => { evCache.push(ev); };
    el.onpointermove = pointermove_handler;

    const pointerup_handler = () => {
        evCache = [];
        prevDiff = -1;
    };
    el.onpointerup = pointerup_handler;
    el.onpointercancel = pointerup_handler;
    el.onpointerout = pointerup_handler;
    el.onpointerleave = pointerup_handler;
}


function pointermove_handler(ev) {
    for (var i = 0; i < evCache.length; i++) {
        if (ev.pointerId == evCache[i].pointerId) {
            evCache[i] = ev;
            break;
        }
    }

    if (evCache.length == 2) {
        const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
        let value = 0;
        if (prevDiff > 0) {
            const step = 4;
            if (curDiff > prevDiff) {
                value += step;
            }
            if (curDiff < prevDiff) {
                value -= step;
            }
        }

        if (value) {
            value += Game.blockSize.value;
            Game.blockSize.value = value < Game.blockSize.min ? Game.blockSize.min : (value > Game.blockSize.max ? Game.blockSize.max : value);
            Game.setSize();
        }

        prevDiff = curDiff;
    }
}
