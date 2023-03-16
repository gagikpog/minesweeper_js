import { ReactElement, useEffect, useState } from "react";
import { loadGameState, saveGameState } from "../game/funcs/loader";
import { loadGame, store } from "../store/main";
import styles from '../styles/Previewer.module.css'

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
            new Promise((resolve) => setTimeout(resolve, 1000))
        ]).then(([data]) => {
            store.dispatch(loadGame(data));

            store.subscribe(() => {
                saveGameState(store.getState());
            });

            setLoaded(true);
        });
    }, []);

    return loaded ? props.children : (
        <div className={`${styles.previewer} ${ animation ? styles.wide : ''}`}>
            Minesweeper
        </div>
    );
}
