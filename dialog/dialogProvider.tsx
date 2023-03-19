import { createContext, ReactElement, useState } from "react";
import styles from '../styles/DialogProvider.module.css';

export const DialogContext = createContext({open: (dialog: IDialog) => {}, close: (closeId: string) => {}});

interface IProps {
    children: ReactElement;
}

interface IAny {
    [key: string]: any;
}

export interface IDialogProps<TResult = unknown> extends IAny {
    close: () => void;
    sendResult: (res: TResult) => void;
}

interface IDialogPrivateProps<TResult> extends IAny {
    handlers?: Partial<{
        onResult: (res: TResult) => void;
        onClose: () => void;
        onOpen: () => void;
    }>;
    modal?: boolean;
}

export interface IDialog<TResult = unknown> {
    id: string;
    template: (props: IDialogProps<TResult>) => JSX.Element;
    props: IDialogPrivateProps<TResult>;
}

interface IZIndex {
    [key: string]: number;
}

export function DialogProvider({children}: IProps) {

    const [ openedDialogs, setOpenedDialogs ] = useState([] as IDialog[]);
    const [ zIndex, setZIndex ] = useState({} as IZIndex);

    const open = (dialog: IDialog) => {

        if (!dialog.id) {
            throw new Error(`Invalid id: ${ dialog.id } for dialog`);
        }

        if (!dialog.template) {
            throw new Error(`Invalid template: ${ dialog.template } for dialog`);
        }

        if (!dialog.props) {
            throw new Error(`Invalid props: ${ dialog.props } for dialog`);
        }

        const openedIndex = openedDialogs.findIndex(({id}) => id === dialog.id);
        const newOpened = [...openedDialogs];

        if (openedIndex !== -1) {
            newOpened[openedIndex] = dialog;
        } else {
            newOpened.push(dialog);
            dialog?.props?.handlers?.onOpen?.();
        }

        const dialogZIndex = openedDialogs.reduce((max, {id}) => {
            return Math.max(max, zIndex[id] || 0);
        }, 0);
        zIndex[dialog.id] = dialogZIndex + 10;

        setZIndex({
            ...zIndex,
            [dialog.id]: dialogZIndex + 10
        });

        setOpenedDialogs(newOpened);
    };

    const close = (closeId: string) => {
        const newOpened = openedDialogs.filter(({id}) => id !== closeId);

        if (newOpened.length !== openedDialogs.length) {
            const dialog = openedDialogs.find(({id}) => id === closeId);
            dialog?.props?.handlers?.onClose?.();

            const newZIndex = { ...zIndex };
            delete newZIndex[closeId];
            setZIndex(newZIndex);
            setOpenedDialogs(newOpened);
        }
    };

    return (
        <>
            <div className="">
                {
                    openedDialogs.map(({template: DialogTmpl, props, id}) => {
                        return (
                            <div key={id} className={`tw-absolute tw-max-w-full tw-max-h-full ${props.modal ? styles.modal : styles.dialog }`} style={{ zIndex: zIndex[id] || 10 }}>
                                {
                                    <DialogTmpl
                                        {...props}
                                        handlers={ undefined }
                                        close={() => close(id)}
                                        sendResult={(res) => props.handlers?.onResult?.(res)}
                                    />
                                }
                            </div>
                        );
                    })
                }
            </div>

            <div className="tw-w-full tw-h-full">
                <DialogContext.Provider value={ { open, close } }>
                    {children}
                </DialogContext.Provider>
            </div>
        </>
    );
}
