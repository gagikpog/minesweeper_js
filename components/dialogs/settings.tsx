import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { IDialogProps } from '../../dialog/contextController';
import DialogTemplate from './dialogTemplate';
import styles from '../../styles/Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/main';
import { loadSettings } from '../../store/settingsSlice';
import { resetAll } from '../../game/funcs/resetAll';

export interface ISettingsResult {
    username: string;
    email: string;
    neverShowRegistration: boolean;
}

interface IProps extends IDialogProps<ISettingsResult> {

}

export function Settings(props: IProps) {

    const dispatch = useDispatch();
    const godMode = useSelector((state: RootState) => state.settings.godMode);
    const blockSize = useSelector((state: RootState) => state.settings.blockSize);

    const godModeChanged = (event: ChangeEvent) => {
        const value = Boolean(event.target.checked);
        dispatch(loadSettings({ godMode: value }));
    };

    const blockSizeChanged = (event: ChangeEvent) => {
        const value = Number(event.target.value);
        dispatch(loadSettings({blockSize: {
            ...blockSize,
            value
        }}));
    };

    return (
        <DialogTemplate close={props.close} title='Settings'>
            <div className='tw-p-8'>
                <div className='tw-grid tw-grid-cols-2'>

                    <label className='tw-pt-8 tw-pb-8' htmlFor='godMode'>God mode</label>
                    <div className='tw-pt-8 tw-pb-8'>
                        <input id='godMode' type='checkbox' checked={godMode} onChange={godModeChanged}/>
                    </div>

                    <label className='tw-pt-8 tw-pb-8' htmlFor='blockSize'>Block size</label>
                    <div className='tw-pt-8 tw-pb-8'>
                        <input type='range' id='blockSize' onChange={blockSizeChanged} value={blockSize.value} min={blockSize.min} max={blockSize.max}/>
                    </div>

                    <div></div>
                    <input type='button' value='Reset all' onClick={resetAll}/>
                </div>
            </div>
        </DialogTemplate>
    );
}
