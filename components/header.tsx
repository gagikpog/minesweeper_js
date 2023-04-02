import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameLevels } from '../game/types';
import { RootState } from '../store/main';
import { changeLevel, newGame } from '../store/gameSlice';
import Select from './select';
import Timer from './timer';
import styles from '../styles/Header.module.css';

interface IProps {

}

export default function Header(props: IProps) {

    const dispatch = useDispatch();

    const totalMines = useSelector((state: RootState) => state.game.totalMines);
    const remainingMines = useSelector((state: RootState) => state.game.remainingMines);
    const level = useSelector((state: RootState) => state.game.level);

    const [options] = useState(() => [
        { value: GameLevels.Beginner, text: 'Beginner' },
        { value: GameLevels.Intermediate, text: 'Intermediate' },
        { value: GameLevels.Advanced, text: 'Advanced' },
    ]);

    return (
        <header className={`${ styles.head } tw-flex tw-p-8`}>

            <div className='tw-flex tw-justify-center tw-items-center tw-p-8 tw-cursor-pointer' onClick={() => dispatch(newGame())}>
                <div>
                    <i className='fa fa-repeat'></i>
                </div>
            </div>

            <div className='tw-flex tw-justify-center tw-items-center tw-p-8 tw-ml-auto'>
                <div>
                    <i className='fa fa-flag-o'></i> { totalMines - remainingMines }
                </div>
            </div>

            <Timer className='tw-mr-auto'/>

            <Select horizontalAlign='left' value={level} icon='fa-navicon' items={options} onChange={(value) => dispatch(changeLevel(value))}></Select>

            {/* bars gear */}

            {/* <button id="settings" onClick={() => notify('showSettings')}>
                &#9881;
            </button> */}
            {/* <svg
                id="leaderBoardButton"
                className="head-menu__leader-board"
                onClick={() => notify('leaderBoardToggle')}
                xmlns="http://www.w3.org/2000/svg"
                version="1"
                viewBox="0 0 24 24"
            >
                <path d="M 3.5 2 L 7.34375 9.75 C 5.9001211 11.027199 5 12.895769 5 15 C 5 18.9 8.1 22 12 22 C 15.9 22 19 18.9 19 15 C 19 12.88714 18.078999 11.027538 16.625 9.75 L 20.5 2 L 18.3125 2 L 14.96875 8.625 C 14.269322 8.3029826 13.493457 8.1082048 12.6875 8.03125 L 15.6875 2 L 13.5 2 L 10.4375 8.1875 C 9.9967633 8.2867425 9.5599118 8.4167807 9.15625 8.59375 L 5.8125 2 L 3.5 2 z M 8.5 2 L 10.1875 5.40625 L 11.1875 3.40625 L 10.5 2 L 8.5 2 z M 12 10 C 14.8 10 17 12.2 17 15 C 17 17.8 14.8 20 12 20 C 9.2 20 7 17.8 7 15 C 7 12.2 9.2 10 12 10 z M 11.6875 12 C 11.5875 12.3 11.0875 13.1875 10.1875 13.1875 L 10.1875 14.1875 L 11.3125 14.1875 L 11.3125 18 L 12.8125 18 L 12.90625 18 L 12.90625 12 L 11.6875 12 z" />
            </svg> */}
        </header>
    );
}