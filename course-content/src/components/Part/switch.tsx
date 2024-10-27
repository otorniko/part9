import { CoursePart, Kind } from "../../types"
import parsers from "./parsers";
import { Background, Basic, Group, Special } from "./cases";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Switch = (props: CoursePart) => {
    switch (props.kind) {
        case Kind.basic:
            return <Basic {...parsers.basic(props)} />;
        case Kind.group:
            return <Group {...parsers.group(props)} />;
        case Kind.background:
            return <Background {...parsers.background(props)} />;
        case Kind.special:
            return <Special {...parsers.special(props)} />;
        default:
            return assertNever(props);
    }
}

export default Switch
