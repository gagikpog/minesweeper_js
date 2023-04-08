import { useSelector } from 'react-redux';
import { RootState } from '../store/main';
import styles from '../styles/StatusBar.module.css';

interface IProps {

}

export default function StatusBar(props: IProps) {
    const width = useSelector((state: RootState) => state.game.width);
    const height = useSelector((state: RootState) => state.game.height);
    const totalMines = useSelector((state: RootState) => state.game.totalMines);
    const openedCount = useSelector((state: RootState) => state.game.openedCount);

    const progress = (openedCount ) / (width * height - totalMines);

    return (
        <div className={`${ styles.head }`}>
            <div className={styles.progress} style={{width: `${progress * 100}%`}}></div>
        </div>
    );
}
