import { useContext } from "react";
import { DialogContext, IDialog } from "./dialogProvider";

export function useDialog(): [<TResult>(dialog: IDialog<TResult>) => void, (closeId: string) => void] {
    const { open, close } = useContext(DialogContext);
    return [open as <TResult>(dialog: IDialog<TResult>) => void, close]
}
