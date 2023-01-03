import Item, { IItem } from "./item";

interface IViewProps {
    map: IItem[][];
    size: number;
    itemClick: (item: IItem, row: number, cell: number, eventType: string) => void;
}

export default function View(props: IViewProps): JSX.Element {

    return (
        <div>
            {
                props.map.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='tw-flex'>
                            {
                                row.map((item, cellIndex) => {
                                    return <Item
                                        key={cellIndex}
                                        item={item}
                                        size={props.size}
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
