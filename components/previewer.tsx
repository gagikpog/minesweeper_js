import { ReactElement, useEffect, useState } from "react";
import { loadGameState, loadTimerState, loadUserState, saveGameState, saveTimerState, saveUserState } from "../game/funcs/loader";
import { loadGame } from "../store/gameSlice";
import { store } from "../store/main";
import styles from '../styles/Previewer.module.css'
import { loadTimer } from "../store/timerSlice";
import { loadUser } from "../store/userSlice";

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
            new Promise((resolve) => setTimeout(resolve, 1000))
        ]).then(([gameData, timerData, userDate]) => {
            store.dispatch(loadGame(gameData));
            store.dispatch(loadTimer(timerData));
            store.dispatch(loadUser(userDate));

            store.subscribe(() => {
                saveGameState(store.getState().game);
                saveTimerState(store.getState().timer);
                saveUserState(store.getState().user);
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
