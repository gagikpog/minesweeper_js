import { ReactElement, useEffect, useState } from "react";
import { loadGameState, loadTimerState, saveGameState, saveTimerState } from "../game/funcs/loader";
import { loadGame } from "../store/gameSlice";
import { store } from "../store/main";
import styles from '../styles/Previewer.module.css'
import { loadTimer } from "../store/timerSlice";

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
            new Promise((resolve) => setTimeout(resolve, 1000))
        ]).then(([gameData, timerData]) => {
            store.dispatch(loadGame(gameData));
            store.dispatch(loadTimer(timerData));

            store.subscribe(() => {
                saveGameState(store.getState().game);
                saveTimerState(store.getState().timer);
            });

            setLoaded(true);
        });
    }, []);

    return loaded ? props.children : (
        <div className="tw-flex tw-w-full tw-h-full tw-items-center tw-justify-center">
            <div className={`${styles.previewer} ${ animation ? styles.wide : ''}`}>
                Minesweeper
            </div>
        </div>
    );
}
