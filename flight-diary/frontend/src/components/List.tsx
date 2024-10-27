import { DiaryEntry } from "../types";
import Entry from "./Entry";

interface ListProps {
    entries: DiaryEntry[]
}

const List = (props: ListProps) => {
    return (
        <>
            <ul>
                {props.entries.map(entry => (
                    <li key={entry.id}>
                        <Entry {...entry} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default List