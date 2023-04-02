import styles from '../styles/Home.module.css';
import { Inter } from '@next/font/google'
import { useMemo, } from 'react';
import View from '../components/view';
import { useDispatch, useSelector } from 'react-redux';
import { openItem,  runNewGame, toggleItemFlag } from '../store/gameSlice';
import {  RootState, store } from '../store/main';
import { EventType, GameState, ItemState } from '../game/types';
import Header from '../components/header';
import { mapGetter } from '../game/funcs/getters';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const dispatch = useDispatch();

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
            <div className={`tw-h-full tw-w-full tw-flex ${ styles.content }`}>
                <Header />
                <main className='tw-flex tw-w-full tw-h-full tw-min-h-0  tw-items-center tw-justify-center' style={ {'--game-items-size': blockSize.value} }>
                    <div className='tw-max-w-full tw-max-h-full tw-flex' >
                        <div className="scroll-container tw-p-20">
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

            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css" integrity="sha384-QYIZto+st3yW+o8+5OHfT6S482Zsvz2WfOzpFSXMF9zqeLcFV0/wlZpMtyFcZALm" ></link> */}

            {/* <div id="leaderBoardDialog" style={{ display: 'none' }} className="leader-board__main">
                <div className="leader-board__head">
                    <div className="leader-board__head-caption">Leader board</div>
                    <div className="leader-board__head-close-button" onClick={() => notify('leaderBoardClose')}>
                        <svg
                            height="15px"
                            viewBox="0 0 413.348 413.348"
                            width="15px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
                        </svg>
                    </div>
                </div>
                <div className="leader-board__tabs" onClick={() => notify('leaderBoardActivateTab')}>
                    <div
                        data-name="beginner"
                        className="leader-board__tab leader-board__tab-beginner leader-board__tab-active"
                    >
                        Beginner
                    </div>
                    <div data-name="intermediate" className="leader-board__tab leader-board__tab-intermediate">
                        Intermediate
                    </div>
                    <div data-name="advanced" className="leader-board__tab leader-board__tab-advanced">
                        Advanced
                    </div>
                </div>
                <div className="leader-board__column-titles">
                    <div className="leader-board__column-title leader-board__column-title_name">Name</div>
                    <div className="leader-board__column-title leader-board__column-title_date">Date</div>
                    <div className="leader-board__column-title leader-board__column-title_time">Duration</div>
                </div>
                <div id="leaderBoardBody" className="leader-board__body"></div>
            </div> */}
        </>
    )
}
