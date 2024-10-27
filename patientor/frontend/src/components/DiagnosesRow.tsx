import { TableRow, TableCell, Typography, Button, Box } from "@mui/material";
import HtmlTooltip from "./HtmlTooltip";
import { Diagnoses, Entry } from "../types";

interface DiagnosesRowProps {
    entry: Entry;
    diagnoses: Diagnoses[];
    latin: boolean;
    handleLatin: () => void;
}

const DiagnosesRow = ({ entry, diagnoses, latin, handleLatin }: DiagnosesRowProps) => {
    return (
        <TableRow>
            <TableCell sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Typography variant='subtitle2' component="span" sx={{ display: 'inline-flex', alignItems: 'center', padding: 0 }}>
                    Diagnoses:&nbsp;
                    <ul style={{ display: "flex", padding: 0, listStyle: "none", marginLeft: '0.5rem', margin: 0 }}>
                        {entry.diagnosisCodes?.map((code, index) => {
                            try {
                                const diagnosis = diagnoses?.find(d => d.code === code)
                                if (diagnosis) {
                                    const name = !latin ? diagnosis.name : diagnosis.latin ? diagnosis.latin : diagnosis.name;
                                    return (
                                        <li style={{ flexGrow: 0 }} key={index}>
                                            <HtmlTooltip title={name}>
                                                {diagnosis.latin ? (
                                                    <Button
                                                        sx={{ color: 'black', '&:hover': { backgroundColor: '#1976d2', color: 'white' } }}
                                                        onMouseDown={handleLatin} onMouseUp={handleLatin}>{code}</Button>
                                                ) : (
                                                    <Box sx={{ color: 'black', p: 1, cursor: 'default' }}>
                                                        {code}
                                                    </Box>
                                                )}
                                            </HtmlTooltip>
                                        </li>
                                    )
                                }
                            } catch (error) {
                                console.error(error)
                                return (
                                    <li style={{ flexGrow: 0 }} key={index}>
                                        <Button>{code}</Button>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </Typography>
            </TableCell>
        </TableRow>
    );
};
export default DiagnosesRow;