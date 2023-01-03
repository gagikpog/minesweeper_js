import { MouseEvent } from "react";
import { Item as ItemModel, ViewModel } from "../public/src/js/item";

export enum ItemState {
    opened = 'opened',
    flag = 'flag',
    hidden = 'hidden'
}

export interface IItem extends ItemModel {
    val: number;
    opened: boolean;
    flag: boolean;
    view: ViewModel;
}

interface IItemProps {
    item: IItem;
    size: number;
    row: number;
    cell: number;
    onClick: (item: ItemModel, row: number, cell: number, eventType: string) => void;
}

interface IEnets {
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function Item(props: IItemProps): JSX.Element {

    const style = {
        width: props.size,
        height: props.size
    };

    const classes = props.item?.view?.classList?.value || '';

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        props.onClick(props.item, props.row, props.cell, 'click');
    }

    if (props.item.opened) {
        return opened(props.item, style, classes, {onClick});
    } else if (props.item.flag) {
        return flag(props.item, style, classes, {onClick});
    } else {
        return hidden(props.item, style, classes, {onClick});
    }
}


function opened(item: IItem, style: object, classes: string, events: IEnets): JSX.Element {
    return (
        <div style={style} className={classes} {...events} ></div>
    );
}

function hidden(item: IItem, style: object, classes: string, events: IEnets): JSX.Element {
    return (
        <div style={style} className={classes} {...events}></div>
    );
}

function flag(item: IItem, style: object, classes: string, events: IEnets): JSX.Element {
    return (
        <div style={style} className={classes} {...events}></div>
    );
}
