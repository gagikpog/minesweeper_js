import { loadSettings } from '../../store/settingsSlice';
import { isClient, isTouchDevice } from '../detection';
import { ChanelEvents } from '../types';
import { Zoom } from './zoom';
import { initServiceWorker } from './initServiceWorker';

export function applicationInit() {
    if (isClient()) {
        stopContextMenu();
        initServiceWorker();
        if (isTouchDevice()) {
            initZoom();
        }
    }
}

function stopContextMenu(): void {
    document.addEventListener('contextmenu', event => event.preventDefault(), false);
}

function initZoom() {
    const zoom = new Zoom();
    zoom.subscribeOnChange((eventName, change: number) => {
        if (eventName === ChanelEvents.ZoomChange) {
            import('../../store/main').then(({store}) => {

                const blockSize = store.getState().settings.blockSize;

                const newValue = blockSize.value + change;

                if (newValue < blockSize.max && newValue > blockSize.min) {
                    store.dispatch(loadSettings({
                        blockSize: {
                            ...blockSize,
                            value: newValue
                        }
                    }));
                }

            })
        }
    })
}
