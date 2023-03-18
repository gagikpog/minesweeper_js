import { CSSProperties, useMemo } from "react";
import { useSelector } from "react-redux";
import { mapGetter } from "../game/funcs/getters";
import { EventType, IMapItem } from "../game/types";
import { RootState } from "../store/main";
import Item from "./item";

interface IViewProps {
    size: number;
    width: number;
    height: number;
    itemClick: (row: number, cell: number, eventType: EventType) => void;
    style: CSSProperties;
}

export default function View(props: IViewProps): JSX.Element {

    const gameMap = useSelector((state: RootState) => state.gameMap);

    const items = useMemo(() => {
        return Array(props.height * props.width).fill(null);
    }, [props.width, props.height])

    return (
        <div style={ props.style } className="tw-flex tw-flex-wrap">
            {
                items.map((_, index) => {
                    const rowIndex = Math.floor(index / props.width);
                    const cellIndex = index % props.width;
                    const item = mapGetter(gameMap, rowIndex, cellIndex);
                    return <Item
                        key={`${rowIndex}-${cellIndex}`}
                        val={ item?.val }
                        state={ item?.state }
                        row={rowIndex}
                        cell={cellIndex}
                        onClick={props.itemClick} />
                })
            }
        </div>
    );
}