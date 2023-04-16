import { GameState } from '../game/types';
import styles from '../styles/AnimationMessage.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/main';
import { useTranslation } from 'react-i18next';

interface IProps {}

export default function AnimationMessage(props: IProps) {
    const gameState = useSelector((state: RootState) => state.game.gameState);
    const { t } = useTranslation();
    let text = '';
    let classes = '';

    switch (gameState) {
        case GameState.gameOver:
            text = t('messages.gameOver');
            classes = `${styles.message} ${styles.gameOver}`;
            break;
        case GameState.gameWin:
            text = t('messages.gameWin');
            classes = `${styles.message} ${styles.gameWin}`;
            break;
    }

    return (
        <div className='tw-z-50'>
            <div className={`${classes} tw-w-full`}>{text}</div>
        </div>
    );
}
