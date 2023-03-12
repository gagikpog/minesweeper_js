import { CSSProperties } from "react";
import { EventType, GameMap, IMapItem } from "../game/types";
import Item from "./item";

interface IViewProps {
    map: GameMap;
    size: number;
    width: number;
    height: number;
    itemClick: (item: IMapItem | undefined, row: number, cell: number, eventType: EventType) => void;
    style: CSSProperties;
}

export default function View(props: IViewProps): JSX.Element {

    return (
        <div style={ props.style }>
            {
                // TODO: Придумать что то получке
                Array(props.height).fill(null).map((_, rowIndex) => {
                    return (
                        <div key={rowIndex} className='tw-flex'>
                            {
                                Array(props.width).fill(null).map((_, cellIndex) => {
                                    return <Item
                                        key={cellIndex}
                                        map={props.map}
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
