import { useContext } from "react";
import { IDialog } from "./contextController";
import { DialogContext } from "./dialogProvider";

export function useDialog(): [<TResult>(dialog: IDialog<TResult>) => void, (closeId: string) => void] {
    const { open, close } = useContext(DialogContext);
    return [open as <TResult>(dialog: IDialog<TResult>) => void, close]
}
