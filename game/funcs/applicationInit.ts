import { loadSettings } from '../../store/settingsSlice';
import { isClient, isTouchDevice } from '../detection';
import { ChanelEvents } from '../types';
import { Zoom } from './zoom';

export function applicationInit() {
    if (isClient()) {
        stopContextMenu();
        runServiceWorker();
        if (isTouchDevice()) {
            initZoom();

        }
    }
}

function stopContextMenu(): void {
    document.addEventListener('contextmenu', event => event.preventDefault(), false);
}

function runServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        const VERSION = '1';
        navigator.serviceWorker.register(`/sw.js?v=${VERSION}`).then((registration) => {
            console.log('Service worker зарегистрирован:', registration);
        }).catch(function(error) {
            console.log('Ошибка при регистрации service worker-а:', error);
        });
    }
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
