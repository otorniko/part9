import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";
import HealthRatingBar from "../HealthRatingBar";
import EntryIcon from "../EntryIcon";
import { useState, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";
import { Diagnoses } from "../../types";
import DiagnosesRow from "../DiagnosesRow";
import { styles, typoStyles } from '../../styles';
import HtmlTooltip from "../HtmlTooltip";

interface HealthCheckProps {
    entry: HealthCheckEntry;
}

const HealthCheck = (props: HealthCheckProps) => {
    const [diagnoses, setDiagnoses] = useState<Diagnoses[] | null>(null);
    const [latin, setLatin] = useState<boolean>(false);
    const entry = props.entry;
    
    useEffect(() => {
        const fetchDiagnoses = async () => {
            const d = await diagnosesService.getAll();
            setDiagnoses(d);
        }
        void fetchDiagnoses();
    }, []);

    const handleLatin = () => {
        setLatin(!latin);
    }

    
    return (
        <div>
            <Table sx={{ ...styles }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <Typography component="span" sx={{ ...typoStyles, color: '#f0f0f0' }}>
                                {entry.date}
                                &nbsp;
                                <HtmlTooltip title={<Typography color="inherit">Health check</Typography>}>
                               <span> <EntryIcon type={entry.type} /> </span>
                                </HtmlTooltip>
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Description: {entry.description}</TableCell>
                    </TableRow>
                    {diagnoses && entry.diagnosisCodes &&
                        <DiagnosesRow entry={entry} diagnoses={diagnoses} latin={latin} handleLatin={handleLatin} />
                    }
                    <TableRow>
                        <TableCell>Specialist: {entry.specialist}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default HealthCheck;