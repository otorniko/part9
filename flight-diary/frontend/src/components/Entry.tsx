import { DiaryEntry } from "../types";

const Entry = (props: DiaryEntry) => {
    return (
        <>
            <h3 style={{ marginBottom: 5, marginTop: 10 }}>{props.date}</h3>
            <p style={{ lineHeight: 0.75, marginBottom: 5, marginTop: 5 }}>
                <strong>Weather: </strong>
                {props.weather}
            </p>
            <p style={{ lineHeight: 0.75, marginBottom: 5, marginTop: 5 }}>
                <strong>Visibility: </strong>
                {props.visibility}
            </p>
            {props.comment.length > 1 && (
                <dl>
                    <dt style={{ lineHeight: 0.75, marginBottom: 5, marginTop: 5 }}>
                        <strong>Comment: </strong>
                    </dt>
                    <dd style={{ lineHeight: 0.75, marginBottom: 5, marginTop: 5 }}>
                        <li>{props.comment}</li>
                    </dd>
                </dl>
            )}
        </>
    )
}

export default Entry;