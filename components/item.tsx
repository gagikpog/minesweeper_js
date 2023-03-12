import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chanel } from "../game/funcs/chanel";
import { chanelEventGetter, mapGetter } from "../game/funcs/getters";
import { ChanelEvents, EventType, GameMap, GameState, IMapItem, ItemState, ItemValues } from "../game/types";
import { RootState } from "../store/main";

interface IItemProps {
    map: GameMap;
    row: number;
    cell: number;
    onClick: (item: IMapItem | undefined, row: number, cell: number, eventType: EventType) => void;
}

export default function Item(props: IItemProps): JSX.Element {

    const gameState = useSelector((state: RootState) => state.gameState);
    const animationSpeed = useSelector((state: RootState) => state.animationSpeed);
    const [isPushed, setPushed] = useState(false);
    const [mineShowed, setMineShowed] = useState(false);

    const style = {};

    let classes = 'cell';
    const item = mapGetter(props.map, props.row, props.cell);

    useEffect(() => {
        const subscribeId = Chanel.subscribe(chanelEventGetter(props.row, props.cell), (eventName: ChanelEvents) => {
            switch (eventName) {
                case ChanelEvents.TogglePushing:
                    setPushed(true);
                    setTimeout(() => {
                        setPushed(false);
                    }, animationSpeed * 6);
                    break;
                case ChanelEvents.ToggleMine:
                    setMineShowed(true)
                    setTimeout(() => {
                        setMineShowed(false);
                    }, animationSpeed * 6);
                    break;
                default:
                    break;
            }
        });

        return () => {
            Chanel.unsubscribe(subscribeId);
        };
    }, []);

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
        case ItemState.hidden:
            if (isPushed) {
                classes += ' pushed';
            }
            break;
        default:
            break;
    }

    // if game ended show all mines
    if (mineShowed || (gameState === GameState.gameWin || gameState === GameState.gameOver) &&
        item.val === ItemValues.mine) {
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
