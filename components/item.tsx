import { MouseEvent } from "react";
import { mapGetter } from "../game/function";
import { GameMap, IMapItem, ItemState } from "../game/types";

interface IItemProps {
    map: GameMap;
    row: number;
    cell: number;
    onClick: (item: IMapItem | undefined, row: number, cell: number, eventType: string) => void;
}

export default function Item(props: IItemProps): JSX.Element {

    const style = {};

    let classes = 'cell';
    const item = mapGetter(props.map, props.row, props.cell);

    switch (item?.state) {
        case ItemState.opened:
            classes += ` open cell${item.val}`
            break;
        case ItemState.flag:
            classes += ` cellFlag`
            break;
        default:
            break;
    }

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        props.onClick(item, props.row, props.cell, 'click');
    }

    return (
        <div style={style} className={classes} onClick={onClick} >
            <div className="cell-content"></div>
        </div>
    );
}
