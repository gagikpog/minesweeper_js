import { ReactElement } from "react";
import { IDialogProps } from "../../dialog/contextController";
import styles from '../../styles/DialogTemplate.module.css';

interface IProps extends Omit<IDialogProps, 'sendResult'> {
    closeButtonVisible?: boolean;
    children: ReactElement;
}

export default function DialogTemplate(props: IProps) {

    const { closeButtonVisible = true, title, children, close } = props;

    return (
        <div className={styles.content}>
            { title ? <div className={`${styles.header} tw-p-8`}> { title } </div> : null }
            {
                closeButtonVisible ? <div className={styles.closeWrapper} onClick={close}>
                    <div className={styles.closeBack}>
                        <div className={styles.close}>
                            &times;
                        </div>
                    </div>
                </div> : null
            }
            <div className={styles.body}> { children } </div>
        </div>
    );
}
