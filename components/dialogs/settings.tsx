import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IDialogProps } from '../../dialog/contextController';
import DialogTemplate from './dialogTemplate';
import styles from '../../styles/Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/main';
import { loadSettings } from '../../store/settingsSlice';
import { resetAll } from '../../game/funcs/resetAll';
import { useTranslation } from 'react-i18next';
import LangSwitcher from '../langSwitcher';
import { Lang } from '../../game/types';

export interface ISettingsResult {
    username: string;
    email: string;
    neverShowRegistration: boolean;
}

interface IProps extends IDialogProps<ISettingsResult> {

}

export function Settings(props: IProps) {

    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const godMode = useSelector((state: RootState) => state.settings.godMode);
    const blockSize = useSelector((state: RootState) => state.settings.blockSize);
    const lang = useSelector((state: RootState) => state.settings.lang);

    const godModeChanged = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const value = Boolean(target.checked);
        dispatch(loadSettings({ godMode: value }));
    };

    const langChanged = (lang: Lang) => {
        dispatch(loadSettings({ lang }));
    };

    const blockSizeChanged = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const value = Number(target.value);
        dispatch(loadSettings({blockSize: {
            ...blockSize,
            value
        }}));
    };

    return (
        <DialogTemplate close={props.close} title={t('settings.caption')}>
            <div className='tw-p-8'>
                <div className='tw-grid tw-grid-cols-2'>

                    <label className='tw-pt-8 tw-pb-8' htmlFor='godMode'>{ t('settings.godMode')}</label>
                    <div className='tw-pt-8 tw-pb-8'>
                        <input id='godMode' type='checkbox' checked={godMode} onChange={godModeChanged}/>
                    </div>

                    <label className='tw-pt-8 tw-pb-8' htmlFor='blockSize'>{ t('settings.blockSize') }</label>
                    <div className='tw-pt-8 tw-pb-8'>
                        <input type='range' id='blockSize' onChange={blockSizeChanged} value={blockSize.value} min={blockSize.min} max={blockSize.max}/>
                    </div>

                    <label className='tw-pt-8 tw-pb-8' htmlFor='lang'>{ t('settings.lang') }</label>
                    <div className='tw-pt-8 tw-pb-8'>
                        <LangSwitcher value={lang} onChange={langChanged}/>
                    </div>

                    <div></div>
                    <input type='button' value={t('settings.resetAll') as string} onClick={resetAll}/>
                </div>
            </div>
        </DialogTemplate>
    );
}
