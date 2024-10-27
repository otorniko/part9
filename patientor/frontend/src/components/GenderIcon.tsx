import { Male, Female, Transgender } from "@mui/icons-material";
import { Gender } from "../types";

type GenderIconProps = {
    gender: Gender;
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const GenderIcon = (props: GenderIconProps) => {
    switch (props.gender) {
        case Gender.Male:
            return (
                <Male />
            );
        case Gender.Female:
            return (
                <Female />
            );
        case Gender.Other:
            return (
                <Transgender />
            );
        default:
            return assertNever(props.gender);
    }
}

export default GenderIcon;