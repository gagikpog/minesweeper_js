import { useSelector } from "react-redux";
import { RootState } from "../store/main";

export default function Timer() {
    const time = useSelector((state: RootState) => state.time);
    return <button>Time {time}</button>;
}
