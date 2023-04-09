import { RootState } from '../../store/main';
import { isClient } from '../detection';

export function getOptimalSize(state: RootState): number {
    if (isClient()) {
        const totalWidth = window.innerWidth - 30;
        const totalHeight = window.innerHeight - 100;
        const kw = totalHeight / state.game.height;
        const kh = totalWidth / state.game.width;
        const k = kw < kh ? kw : kh;
        const minSize = state.settings.blockSize.value;
        return k > minSize ? k : minSize;
    } else {
        return state.settings.blockSize.default
    }
}
