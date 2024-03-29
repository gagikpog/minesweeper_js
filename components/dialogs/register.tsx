import { FormEvent, useRef, useState } from 'react';
import { IDialogProps } from '../../dialog/contextController';
import DialogTemplate from './dialogTemplate';
import styles from '../../styles/Register.module.css';
import { InfoBox } from '../infoBox';
import { useTranslation } from 'react-i18next';

export interface IRegisterResult {
    username: string;
    email: string;
    neverShowRegistration: boolean;
}

interface IProps extends IDialogProps<IRegisterResult> {

}

export function Register(props: IProps) {

    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const { t } = useTranslation();
    const [messages, setMessages] = useState({email: '', username: ''});
    const usernamePattern = '[a-zA-Zа-яА-я\s]{2,}';
    const emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';

    const register = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const inputName = userNameRef.current ? userNameRef.current as HTMLInputElement : null;
        const inputMail = emailRef.current ? emailRef.current as HTMLInputElement : null;
        const username = inputName?.value || '';
        const email = inputMail?.value || 't@g.p';

        const nameMatched = new RegExp(usernamePattern).test(username)
        const emailMatched = new RegExp(emailPattern).test(email)

        if (nameMatched && emailMatched) {
            props.sendResult({ username, email, neverShowRegistration: false });
            props.close();
        } else {
            setMessages({
                email: !emailMatched ? 'Invalid email address' : '',
                username: !nameMatched ? 'Invalid user name' : ''
            });

            setTimeout(() => setMessages({email: '', username: ''}) , 2000);
        }

        return false;
    };

    const closeNoRegistration = () => {
        props.sendResult({ username: '', email: '', neverShowRegistration: true });
        props.close();
    };

    return (
        <DialogTemplate close={props.close} title={t('register.caption')}>
            <div className='tw-p-8'>
                <form action='/' onSubmit={register}>
                    <div>
                        {t('register.description')}
                    </div>
                    {/* <div className='tw-flex tw-flex-col tw-pt-8'>
                        <label htmlFor='email'>Email *</label>
                        <InfoBox message={messages.email} style='danger'>
                            <input ref={emailRef} required name='email' type='text' placeholder='Enter your email' pattern={emailPattern}/>
                        </InfoBox>
                    </div> */}
                    <div className='tw-flex tw-flex-col tw-pt-8'>
                        <label htmlFor='username'>{t('register.name')} *</label>
                        <InfoBox message={messages.username} style='danger'>
                            <input ref={userNameRef} required name='username' type='text' placeholder={t('register.namePlaceholder') as string} pattern={usernamePattern}/>
                        </InfoBox>
                    </div>
                    <div className='tw-flex tw-justify-end tw-pt-8'>
                        <div className={`tw-p-4 tw-mr-8 ${styles.registerButton}`} onClick={() => closeNoRegistration()}>
                            {t('register.neverShow')}
                        </div>
                        <div className={`tw-p-4 ${styles.registerButton}`} onClick={() => register()}>
                            {t('register.register')}
                        </div>
                    </div>
                </form>
            </div>
        </DialogTemplate>
    );
}
