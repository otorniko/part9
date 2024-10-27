import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Diagnoses, OccupationalHealthcareEntry } from '../../types';
import EntryIcon from '../EntryIcon';
import diagnosesService from '../../services/diagnoses';
import { useEffect, useState } from 'react';
import DiagnosesRow from '../DiagnosesRow';
import { styles, typoStyles } from '../../styles';
import HtmlTooltip from '../HtmlTooltip';

interface OccupationalHealthcareProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
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
            <Table sx={{ ...styles }} align="left">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >
                            <Typography component="span" sx={{ ...typoStyles, color: '#f0f0f0' }}>
                                {entry.date}
                                &nbsp;
                                <HtmlTooltip title={<Typography color="inherit">Occupational healthcare</Typography>}>
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
                                <TableCell>Employer: {entry.employerName}</TableCell>
                            </TableRow>
                    {entry.sickLeave && (
                            <TableRow>
                                <TableCell>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</TableCell>
                            </TableRow>
                        
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default OccupationalHealthcare