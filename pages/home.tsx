import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useMemo, } from 'react';
import View from '../components/view';
import { useDispatch, useSelector } from 'react-redux';
import { openItem, RootState, runNewGame, store, toggleItemFlag } from '../store/main';
import { EventType, GameState, IMapItem, ItemState } from '../game/types';
import Header from '../components/header';
import { mapGetter } from '../game/funcs/getters';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const dispatch = useDispatch();

    const width = useSelector((state: RootState) => state.width);
    const height = useSelector((state: RootState) => state.height);
    const blockSize = useSelector((state: RootState) => state.blockSize);
    const gameState = useSelector((state: RootState) => state.gameState);
    const displayBlocked = useSelector((state: RootState) => state.displayBlocked);
    const godMode = useSelector((state: RootState) => state.godMode);


    const itemClick = useMemo(() => (row: number, cell: number, eventType: EventType) => {

        const gameMap = store.getState().gameMap

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
            <div className='tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center' style={ {'--game-items-size': blockSize.value} }>
                <div className='tw-max-w-full tw-max-h-full tw-flex tw-flex-col'>
                    <Header />

                    <main className="scroll-container">
                        {
                            <View
                                style={{ width: `${blockSize.value * width}px` }}
                                size={blockSize.value}
                                width={width}
                                height={height}
                                itemClick={itemClick}/>
                        }
                    </main>
                </div>
            </div>
            {/* <div id="stub">Minesweeper</div> */}

            { displayBlocked ? <div className='blocker'></div> : '' }

            {/* <div style={{ display: 'none' }} className="text-wrapper" id="text-wrapper">
                <div className="form-wrapper">
                    <input required name="userName" placeholder="Enter name" type="text" />
                    <div className="form-remember">
                        <label htmlFor="rememberName">Remember this name</label>
                        <input name="rememberName" type="checkbox" />
                    </div>
                </div>
            </div> */}

            <div className="cell-9"></div>

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
            {/* <script src="https://gagikpog.ru/data/libs/quicksettings.min.js"></script>
            <script src="https://gagikpog.ru/confirm/confirm.min.js"></script> */}

        </>
    )
}
