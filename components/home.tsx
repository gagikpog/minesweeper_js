import styles from '../styles/Home.module.css';
import { Inter } from '@next/font/google'
import { useMemo, } from 'react';
import View from './view';
import { useDispatch, useSelector } from 'react-redux';
import { openItem,  runNewGame, toggleItemFlag } from '../store/gameSlice';
import {  AppDispatch, RootState, store } from '../store/main';
import { EventType, GameState, ItemState } from '../game/types';
import Header from './header';
import { mapGetter } from '../game/funcs/getters';
import StatusBar from './statusBar';
import Preview from './preview';
const inter = Inter({ subsets: ['latin'] });

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default function Home() {
    const dispatch = useAppDispatch();

    const width = useSelector((state: RootState) => state.game.width);
    const height = useSelector((state: RootState) => state.game.height);
    const gameState = useSelector((state: RootState) => state.game.gameState);
    const displayBlocked = useSelector((state: RootState) => state.game.displayBlocked);
    const blockSize = useSelector((state: RootState) => state.settings.blockSize);
    const godMode = useSelector((state: RootState) => state.settings.godMode);

    const itemClick = useMemo(() => (row: number, cell: number, eventType: EventType) => {

        const gameMap = store.getState().game.gameMap

        const item = mapGetter(gameMap, row, cell);
        switch (gameState) {
            case GameState.newGame:
                dispatch(runNewGame({ point: { x: cell, y: row }}));
                dispatch(openItem({ point: { x: cell, y: row }}));
                break;
            case GameState.game:
                if (eventType === EventType.rightClick &&
                        (item?.state === ItemState.hidden || item?.state === ItemState.flag)
                    ) {
                    dispatch(toggleItemFlag({ point: { x: cell, y: row }}));
                } else {
                    if (eventType === EventType.click || godMode) {
                        dispatch(openItem({ point: { x: cell, y: row }}));
                    }
                }
                break;
            case GameState.pause:
            case GameState.gameOver:
            default:
                break;
        }

    }, [gameState]);

    return (
        <>
            <div className={`tw-h-full tw-w-full tw-flex ${ styles.content }`} style={{ '--game-items-width': width, '--game-items-height': height } as React.CSSProperties}>
                <Header className='tw-z-20'/>
                <StatusBar/>
                <Preview />
                <main className='tw-flex tw-w-full tw-h-full tw-min-h-0  tw-items-center tw-justify-center' style={ {'--game-items-size': blockSize.value} as React.CSSProperties}>
                    <div className='tw-max-w-full tw-max-h-full tw-flex' >
                        <div className={`scroll-container ${styles.gameContent}`}>
                            <View
                                style={{ width: `${blockSize.value * width}px` }}
                                size={blockSize.value}
                                width={width}
                                height={height}
                                itemClick={itemClick}/>
                        </div>
                    </div>
                </main>
            </div>

            { displayBlocked ? <div className='blocker'></div> : '' }

            <div className="cell-9"></div>
        </>
    )
}
