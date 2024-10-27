import { Healing, MonitorHeart, MedicalInformation } from "@mui/icons-material";
import { EntryType } from "../types";

type EntryIconProps = {
    type: EntryType;
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryIcon = ({ type }: EntryIconProps) => {
    switch (type) {
        case EntryType.HealthCheck:
            return (
                <MonitorHeart />
            );
        case EntryType.Hospital:
            return (
                <Healing />
            );
        case EntryType.OccupationalHealthcare:
            return (
                <MedicalInformation />
            );
        default:
            return assertNever(type);
    }
}

export default EntryIcon;