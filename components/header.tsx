import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameLevels } from '../game/types';
import { AppDispatch, RootState } from '../store/main';
import { changeLevel, newGame } from '../store/gameSlice';
import Select from './select';
import Timer from './timer';
import styles from '../styles/Header.module.css';
import { showStatistics } from '../store/statisticSlice';
import Button from './button';
import { showSettings } from '../store/settingsSlice';

interface IProps {
    className?: string;
}

export default function Header(props: IProps) {

    const dispatch = useDispatch<AppDispatch>();

    const totalMines = useSelector((state: RootState) => state.game.totalMines);
    const remainingMines = useSelector((state: RootState) => state.game.remainingMines);
    const level = useSelector((state: RootState) => state.game.level);

    const [options] = useState(() => [
        { value: GameLevels.Beginner, text: 'Beginner' },
        { value: GameLevels.Intermediate, text: 'Intermediate' },
        { value: GameLevels.Advanced, text: 'Advanced' },
    ]);

    return (
        <header className={`${ styles.head } ${props.className || ''} tw-grid tw-grid-cols-3 tw-p-8`}>

            <div className='tw-flex'>
                <Button icon='fa-repeat' onClick={() => dispatch(newGame())}/>
            </div>
            <div className='tw-flex tw-justify-center'>
                <Button icon='fa-flag-o' caption={`${ totalMines - remainingMines}`}/>
                <Timer />
            </div>
            <div className='tw-flex tw-justify-end'>
                <Button icon='fa-rocket' onClick={() => dispatch(showStatistics())}/>
                <Button icon='fa-wrench' onClick={() => showSettings()}/>
                <Select horizontalAlign='left' value={level} icon='fa-navicon' items={options} onChange={(value) => dispatch(changeLevel(value))}></Select>
            </div>

            {/* fa-book fa-wrench fa-rocket */}

        </header>
    );
}