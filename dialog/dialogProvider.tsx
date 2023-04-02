import { createContext, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import styles from '../styles/DialogProvider.module.css';
import { ContextController } from "./contextController";
export const controller = new ContextController();
export const DialogContext = createContext(controller);

interface IProps {
    children: ReactElement;
}

export function DialogProvider({children}: IProps) {

    const [version, setVersion] = useState(0);

    const nextVersion = useCallback(() => setVersion(++controller.version), []);
    useEffect(() => controller.nextVersion = nextVersion, []);

    const zIndex = useMemo(() => controller.zIndex, [version]);
    const openedDialogs = useMemo(() => controller.openedDialogs, [version]);

    return (
        <>
            <div className="">
                {
                    openedDialogs.map(({template: DialogTmpl, props, id}) => {
                        return (
                            <div
                                key={id}
                                className={`tw-absolute tw-max-w-full tw-max-h-full ${props.modal ? styles.modal : styles.dialog }`}
                                style={{ zIndex: zIndex[id] || 10 }}>
                                {
                                    <DialogTmpl
                                        {...props}
                                        handlers={ undefined }
                                        close={() => controller.close(id)}
                                        sendResult={(res) => props.handlers?.onResult?.(res)}
                                    />
                                }
                            </div>
                        );
                    })
                }
            </div>

            <div className="tw-w-full tw-h-full">
                <DialogContext.Provider value={ controller }>
                    {children}
                </DialogContext.Provider>
            </div>
        </>
    );
}
