import { IDialogProps } from '../../dialog/contextController';
import DialogTemplate from './dialogTemplate';
import styles from '../../styles/Statistics.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../store/main';
import { useEffect, useMemo, useState } from 'react';
import { GameLevels, IStatisticsItem } from '../../game/types';
import { clearStatistic, loadStatistic } from '../../store/statisticSlice';
import { useTranslation } from 'react-i18next';

interface IProps extends IDialogProps<void> {

}

const padStart = (num: number) => `${num}`.padStart(2, '0');

function dateFormat(date: string): string {
    const d = new Date(date);
    return `${padStart(d.getDate())}.${padStart(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function table(items: IStatisticsItem[], header: boolean = true, t: (v: string) => string) {
    return items.map(({name, date, time}, index) => {
        return (
            <div key={index} className='tw-contents'>
                <div className='tw-p-8'> { header ? index + 1 : t('statistics.number') } </div>
                <div className={`tw-p-8 tw-truncate`}> {name} </div>
                <div className={`tw-p-8 ${styles.noWrap}`}> {header ? dateFormat(date) : date} </div>
                <div className='tw-p-8 tw-flex tw-justify-end'> {time} </div>
            </div>
        );
    });
}

export function Statistics(props: IProps) {

    const dispatch = useDispatch<AppDispatch>();
    const beginner = useSelector((state: RootState) => state.statistics.beginner);
    const intermediate = useSelector((state: RootState) => state.statistics.intermediate);
    const advanced = useSelector((state: RootState) => state.statistics.advanced);
    const { t } = useTranslation();

    const [levelQueue, setLevelQueue] = useState({ value: GameLevels.Beginner, prev: GameLevels.Beginner });

    const setLevel = (level: GameLevels) => {
        setLevelQueue((prevLevelQueue) => {
            if (prevLevelQueue.value === level) {
                return prevLevelQueue;
            } else {
                return {
                    value: level,
                    prev: prevLevelQueue.value
                };
            }
        });
    };

    const header = useMemo(() => ([{ name: t('statistics.user'), date: t('statistics.date'), time: t('statistics.time') }]), []);

    const body: IStatisticsItem[] = useMemo(() => {
        const items = store.getState().statistics[levelQueue.value];
        const prevItems = store.getState().statistics[levelQueue.prev];
        return items.length ? items : prevItems;
    }, [levelQueue.value, beginner, intermediate, advanced]);


    useEffect(() => {
        const items = store.getState().statistics[levelQueue.value];
        if (!items.length) {
            dispatch(loadStatistic({ level: levelQueue.value }));
        }
    }, [levelQueue.value])

    useEffect(() => {
        return () => {
            dispatch(clearStatistic());
        }
    }, [])

    return (
        <DialogTemplate close={props.close} title={t('statistics.caption')}>
            <div>
                <div className='tw-flex'>
                    <div className={`tw-p-4 tw-m-4 tw-cursor-pointer ${levelQueue.value === GameLevels.Beginner ? styles.selected : ''}`} onClick={() => setLevel(GameLevels.Beginner)}>
                        {t('common.beginner')}
                    </div>
                    <div className={`tw-p-4 tw-m-4 tw-cursor-pointer ${levelQueue.value === GameLevels.Intermediate ? styles.selected : ''}`} onClick={() => setLevel(GameLevels.Intermediate)}>
                        {t('common.intermediate')}
                    </div>
                    <div className={`tw-p-4 tw-m-4 tw-cursor-pointer ${levelQueue.value === GameLevels.Advanced ? styles.selected : ''}`} onClick={() => setLevel(GameLevels.Advanced)}>
                        {t('common.advanced')}
                    </div>
                </div>
                <div className={`tw-grid ${ styles.grid }`}>
                    {table(header, false, t)}
                    {table(body, undefined, t)}
                </div>
            </div>
        </DialogTemplate>
    );
}
