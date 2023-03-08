import { MouseEvent } from "react";
import { getKey } from "../game/function";
import { MapItem } from "../game/mapItem";
import { GameMap } from "../game/types";

interface IItemProps {
    map: GameMap;
    row: number;
    cell: number;
    onClick: (item: MapItem, row: number, cell: number, eventType: string) => void;
}

interface IEnets {
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function Item(props: IItemProps): JSX.Element {

    const style = {};

    const classes = 'cell';

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        props.onClick(item, props.row, props.cell, 'click');
    }

    const item = props.map?.[getKey(props.row, props.cell)];

    return (
        <div style={style} className={classes} onClick={onClick} >
            <div className="cell-content"></div>
        </div>
    );
}
