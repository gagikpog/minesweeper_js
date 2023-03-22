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

export class ContextController {

    openedDialogs: IDialog[] = [];
    zIndex: IZIndex = {};
    version = 0;
    nextVersion: () => void = () => {};

    open = (dialog: IDialog): void => {

        if (!dialog.id) {
            throw new Error(`Invalid id: ${ dialog.id } for dialog`);
        }

        if (!dialog.template) {
            throw new Error(`Invalid template: ${ dialog.template } for dialog`);
        }

        if (!dialog.props) {
            throw new Error(`Invalid props: ${ dialog.props } for dialog`);
        }

        const openedIndex = this.openedDialogs.findIndex(({id}) => id === dialog.id);
        const newOpened = [...this.openedDialogs];

        if (openedIndex !== -1) {
            newOpened[openedIndex] = dialog;
        } else {
            newOpened.push(dialog);
            dialog?.props?.handlers?.onOpen?.();
        }

        const dialogZIndex = this.openedDialogs.reduce((max, {id}) => {
            return Math.max(max, this.zIndex[id] || 0);
        }, 0);
        this.zIndex[dialog.id] = dialogZIndex + 10;

        this.zIndex = {
            ...this.zIndex,
            [dialog.id]: dialogZIndex + 10
        };

        this.openedDialogs = newOpened;
        this.nextVersion();
    };

    close = (closeId: string): void => {
        const newOpened = this.openedDialogs.filter(({id}) => id !== closeId);

        if (newOpened.length !== this.openedDialogs.length) {
            const dialog = this.openedDialogs.find(({id}) => id === closeId);
            dialog?.props?.handlers?.onClose?.();

            const newZIndex = { ...this.zIndex };
            delete newZIndex[closeId];
            this.zIndex = newZIndex;
            this.openedDialogs = newOpened;
        }
        this.nextVersion();
    };
}
