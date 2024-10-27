import { Entry, EntryType } from "../../types";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case EntryType.HealthCheck:
            return (
                <HealthCheck entry={entry} />
            );
        case EntryType.Hospital:
            return (
                <Hospital entry={entry} />
            );
        case EntryType.OccupationalHealthcare:
            return (
                <OccupationalHealthcare entry={entry} />
            );
        default:
            return assertNever(entry);
    }
};
export default EntryDetails;