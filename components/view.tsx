import { CSSProperties } from "react";
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

    return (
        <div style={ props.style }>
            {
                // TODO: Придумать что то получке
                Array(props.height).fill(null).map((_, rowIndex) => {
                    return (
                        <div key={rowIndex} className='tw-flex'>
                            {
                                Array(props.width).fill(null).map((_, cellIndex) => {
                                    const item = mapGetter(gameMap, rowIndex, cellIndex);
                                    return <Item
                                        key={cellIndex}
                                        val={ item?.val }
                                        state={ item?.state }
                                        row={rowIndex}
                                        cell={cellIndex}
                                        onClick={props.itemClick} />
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}
