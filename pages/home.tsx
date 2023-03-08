import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import View from '../components/view';
import { Game } from '../public/src/js/game';
import { Item } from '../public/src/js/item';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setGameMap } from '../store/main';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    /** @ts-ignore */
    const notify = (eventName: string) => window.notify(eventName);

    const dispatch =  useDispatch();

    const gameMap = useSelector((state: RootState) => state.gameMap);

    const [options] = useState(() => [
        { value: 'beginner', text: 'Beginner' },
        { value: 'intermediate', text: 'Intermediate' },
        { value: 'advanced', text: 'Advanced' },
    ]);

    const onMapChanged = (newMap) => {
        dispatch(setGameMap(newMap));
    };

    let [game] = typeof window !== 'undefined' ? useState(() => new Game(onMapChanged)) : [];

    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.currentGame = game;
    }

    const itemClick = (item: Item, row: number, cell: number, eventType: string): void => {
        if (game) {
            game.itemClick(item, row, cell, eventType);
        }
    }

    return (
        <>
            <main id="mainContent">
                <div className="head">
                    <button onClick={() => notify('newGame')}>New game</button>
                    <button id="mines">10</button>
                    <button id="time">Time 0</button>
                    {/* onChange={() => levelItemChanged(this)} */}
                    <select name="level" id="level">
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>

                    <button id="settings" onClick={() => notify('showSettings')}>
                        &#9881;
                    </button>
                    <svg
                        id="leaderBoardButton"
                        className="head-menu__leader-board"
                        onClick={() => notify('leaderBoardToggle')}
                        xmlns="http://www.w3.org/2000/svg"
                        version="1"
                        viewBox="0 0 24 24"
                    >
                        <path d="M 3.5 2 L 7.34375 9.75 C 5.9001211 11.027199 5 12.895769 5 15 C 5 18.9 8.1 22 12 22 C 15.9 22 19 18.9 19 15 C 19 12.88714 18.078999 11.027538 16.625 9.75 L 20.5 2 L 18.3125 2 L 14.96875 8.625 C 14.269322 8.3029826 13.493457 8.1082048 12.6875 8.03125 L 15.6875 2 L 13.5 2 L 10.4375 8.1875 C 9.9967633 8.2867425 9.5599118 8.4167807 9.15625 8.59375 L 5.8125 2 L 3.5 2 z M 8.5 2 L 10.1875 5.40625 L 11.1875 3.40625 L 10.5 2 L 8.5 2 z M 12 10 C 14.8 10 17 12.2 17 15 C 17 17.8 14.8 20 12 20 C 9.2 20 7 17.8 7 15 C 7 12.2 9.2 10 12 10 z M 11.6875 12 C 11.5875 12.3 11.0875 13.1875 10.1875 13.1875 L 10.1875 14.1875 L 11.3125 14.1875 L 11.3125 18 L 12.8125 18 L 12.90625 18 L 12.90625 12 L 11.6875 12 z" />
                    </svg>
                </div>
                <div className="scroll-container">
                    {
                        // @ts-ignore
                        game ? <View map={game.map} size={Game.blockSize.value} itemClick={itemClick}></View> : null
                    }
                </div>
            </main>
            {/* <div id="stub">Minesweeper</div> */}
            {/* <div id="blocker"></div> */}

            <div style={{ display: 'none' }} className="text-wrapper" id="text-wrapper">
                <div className="form-wrapper">
                    <input required name="userName" placeholder="Enter name" type="text" />
                    <div className="form-remember">
                        <label htmlFor="rememberName">Remember this name</label>
                        <input name="rememberName" type="checkbox" />
                    </div>
                </div>
            </div>

            <div className="cell9"></div>

            <div id="leaderBoardDialog" style={{ display: 'none' }} className="leader-board__main">
                <div className="leader-board__head">
                    <div className="leader-board__head-caption">Leaderboard</div>
                    <div className="leader-board__head-close-button" onClick={() => notify('leaderBoardClose')}>
                        <svg
                            id="Capa_1"
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
            </div>
            <script src="https://gagikpog.ru/data/libs/quicksettings.min.js"></script>
            <script src="https://gagikpog.ru/confirm/confirm.min.js"></script>

        </>
    )
}
