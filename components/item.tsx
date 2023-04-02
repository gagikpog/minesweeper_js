import { memo, MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chanel } from "../game/funcs/chanel";
import { chanelEventGetter, mapGetter } from "../game/funcs/getters";
import { ChanelEvents, EventType, GameState, IMapItem, ItemState, ItemValues } from "../game/types";
import { RootState } from "../store/main";

interface IItemProps {
    val: number;
    state: ItemState;
    row: number;
    cell: number;
    onClick: (row: number, cell: number, eventType: EventType) => void;
}

export default memo(function Item(props: IItemProps): JSX.Element {

    const gameState = useSelector((state: RootState) => state.game.gameState);
    const animationSpeed = useSelector((state: RootState) => state.settings.animationSpeed);
    const [isPushed, setPushed] = useState(false);
    const [mineShowed, setMineShowed] = useState(false);

    const style = {};

    let classes = 'cell';

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

    switch (props.state) {
        case ItemState.opened:
            if (gameState === GameState.gameOver && props.val === ItemValues.mine) {
                // if game over show wrong opening
                classes += ' cell-x';
            } else {
                classes += ` open cell-${props.val}`;
            }
            break;
        case ItemState.flag:
            classes += ` cell-flag`;
            // if game over show wrong flags
            if (gameState === GameState.gameOver && props.val !== ItemValues.mine) {
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
        props.val === ItemValues.mine) {
        classes += ' cell-9'
    }

    const onClick = (event: MouseEvent, eventName: EventType) => {
        event.stopPropagation();
        event.preventDefault();
        props.onClick(props.row, props.cell, eventName);
    };

    return (
        <div style={style}
            className={classes}
            onClick={(e) => onClick(e, EventType.click)}
            onContextMenu={(e) => onClick(e, EventType.rightClick)}>
        </div>
    );
});
