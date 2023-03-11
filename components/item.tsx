import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { mapGetter } from "../game/function";
import { EventType, GameMap, GameState, IMapItem, ItemState, ItemValues } from "../game/types";
import { RootState } from "../store/main";

interface IItemProps {
    map: GameMap;
    row: number;
    cell: number;
    onClick: (item: IMapItem | undefined, row: number, cell: number, eventType: EventType) => void;
}

export default function Item(props: IItemProps): JSX.Element {

    const gameState = useSelector((state: RootState) => state.gameState);

    const style = {};

    let classes = 'cell';
    const item = mapGetter(props.map, props.row, props.cell);

    switch (item?.state) {
        case ItemState.opened:
            if (gameState === GameState.gameOver && item.val === ItemValues.mine) {
                // if game over show wrong opening
                classes += ' cell-x';
            } else {
                classes += ` open cell-${item.val}`;
            }
            break;
        case ItemState.flag:
            classes += ` cell-flag`;
            // if game over show wrong flags
            if (gameState === GameState.gameOver && item.val !== ItemValues.mine) {
                classes += ' cell-x';
            }
            break;
        default:
            break;
    }

    // if game ended show all mines
    if ((gameState === GameState.gameWin || gameState === GameState.gameOver) && item.val === ItemValues.mine) {
        classes += ' cell-9'
    }

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        props.onClick(item, props.row, props.cell, EventType.click);
    }

    const onContextMenu = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
        props.onClick(item, props.row, props.cell, EventType.rightClick);
    }

    return (
        <div style={style} className={classes} onClick={onClick} onContextMenu={onContextMenu}>
            <div className="cell-content"></div>
        </div>
    );
}
