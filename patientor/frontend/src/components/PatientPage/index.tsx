import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useState } from "react";
import { Patient } from "../../types";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";
import GenderIcon from "../GenderIcon";
import AddEntryModal from "../AddEntryModal";
import { cellStyles, typoStyles } from "../../styles";



const PatientPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const { id } = useParams<{ id: string }>();
    if (!id) {
        return null;
    }
    const fetchPatient = async () => {
        const patient = await patientService.getOne(id);
        setPatient(patient);
    }
    void fetchPatient();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: any) => {
        try {
            console.log(values);
            await patientService.addEntry(id, values);
            setModalOpen(false);
            void fetchPatient();
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
                setError(e.message);
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    }

    if (!patient) {
        return null;
    }

    const sortedEntries = patient.entries.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return (
        <div>
            <Table sx={{maxWidth: 500}}>
                    <TableHead>

                        <TableRow>
                        <TableCell sx={{ ...cellStyles }} align="left" colSpan={2}>
                            <Box>
                                <Typography variant="h6" sx={{ mt: 2, }}>
                                    Patient information
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ ...cellStyles }} align="left" colSpan={2}>
                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                <li>
                                <Typography component="span" sx={{ ...typoStyles }}>
                                {patient.name}
                                &nbsp;
                                <GenderIcon gender={patient.gender} />
                            </Typography>
                                </li>
                                <li>
                                <p style={{ marginTop: 2, marginBottom: 2, lineHeight: 1.5 }}>Date of birth: {patient.dateOfBirth}</p>
                                </li>
                                <li>
                                <p style={{ marginTop: 2, lineHeight: 1.5 }}>SSN: {patient.ssn}</p>
                                </li>
                                </ul>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ ...cellStyles, paddingLeft: 5  }} align="center">
                            {patient.entries.length > 0 ?
                                <Typography variant="h6" sx={{ mt: 2, marginBottom: 2 }}>
                                    Entries:
                                </Typography>
                                :
                                <Typography variant="h6" sx={{ mt: 2, marginBottom: 2 }}>
                                    No entries
                                </Typography>
                            }
                        </TableCell>
                        <TableCell sx={{ ...cellStyles }} align="center">
                            <AddEntryModal
                                modalOpen={modalOpen}
                                onSubmit={submitNewEntry}
                                error={error}
                                onClose={closeModal}
                            />
                            <Button variant="contained" onClick={() => openModal()}>
                                Add Entry
                            </Button>
                        </TableCell>
                    </TableRow>
                {sortedEntries.map((entry) => (
                    <TableRow key={entry.id}>
                        <TableCell  sx={{ ...cellStyles }} colSpan={2}>
                            <EntryDetails key={entry.id} entry={entry} />
                        </TableCell>
                    </TableRow>
                ))}

                </TableBody>
            </Table>
        </div>
    );
};

export default PatientPage;