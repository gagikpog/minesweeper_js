import { ReactElement, useEffect, useState } from "react";
import { loadGameState, loadSettingsState, loadTimerState, loadUserState, saveGameState, saveSettingsState, saveTimerState, saveUserState } from "../game/funcs/loader";
import { loadGame } from "../store/gameSlice";
import { store } from "../store/main";
import styles from '../styles/Previewer.module.css'
import { loadTimer } from "../store/timerSlice";
import { loadUser } from "../store/userSlice";
import { loadSettings } from "../store/settingsSlice";
import { GameState } from "../game/types";

interface IProps {
    children: ReactElement;
}

export default function Previewer(props: IProps) {

    const [loaded, setLoaded] = useState(false);
    const [animation, startAnimation] = useState(false);

    useEffect(() => {
        setTimeout(startAnimation, 100, true);
        Promise.all([
            loadGameState(),
            loadTimerState(),
            loadUserState(),
            loadSettingsState(),
            new Promise((resolve) => setTimeout(resolve, 1000))
        ]).then(([gameData, timerData, userData, settingsData]) => {
            store.dispatch(loadGame(gameData));
            if (gameData.gameState === GameState.game || gameData.gameState === GameState.pause) {
                store.dispatch(loadTimer(timerData));
            }
            store.dispatch(loadUser(userData));
            store.dispatch(loadSettings(settingsData));

            store.subscribe(() => {
                saveGameState(store.getState().game);
                saveTimerState(store.getState().timer);
                saveUserState(store.getState().user);
                saveSettingsState(store.getState().settings);
            });

            setLoaded(true);
        });
    }, []);

    return loaded ? props.children : (
        <div className="tw-flex tw-w-full tw-h-full tw-items-center tw-justify-center tw-flex-col">
            <div className={`tw-mt-auto ${styles.previewer } ${ animation ? styles.wide : ''}`}>
                Minesweeper
            </div>
            <div className={`tw-mt-auto tw-mb-20 ${styles.footer}`}>
                Created By gagikpog
            </div>
        </div>
    );
}
