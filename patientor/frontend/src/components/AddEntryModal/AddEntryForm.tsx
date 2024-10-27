import { useState, SyntheticEvent, ChangeEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Radio, RadioGroup, FormControlLabel, Checkbox, ListItemText, OutlinedInput, FormControl, Slider, Box } from '@mui/material';

import { EntryFormValues, EntryType, Diagnoses, HealthCheckRating, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { formatDate } from "../../utils";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const HealthCheckRatingOptions = [
    {
        value: HealthCheckRating.Healthy,
        label: 'Healthy',
    },
    {
        value: HealthCheckRating.LowRisk,
        label: 'Low risk',
    },
    {
        value: HealthCheckRating.HighRisk,
        label: 'High risk',
    },
    {
        value: HealthCheckRating.CriticalRisk,
        label: 'Critical risk',
    }];

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(formatDate(new Date().toISOString()));
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnoses['code'][]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [discharge, setDischarge] = useState({ date: formatDate(new Date().toISOString()), criteria: '' });
    const [employerName, setEmployerName] = useState('');
    const [sickLeave, setSickLeave] = useState({ startDate: formatDate(new Date().toISOString()), endDate: '' });
    const [specialist, setSpecialist] = useState('');

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value as EntryType);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(formatDate(new Date(event.target.value).toISOString()));
    };

    const handleDischargeDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDischarge({ ...discharge, date: formatDate(new Date(event.target.value).toISOString()) });
    };

    const handleSickLeaveStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSickLeave({ ...sickLeave, startDate: formatDate(new Date(event.target.value).toISOString()) });  
    };

    const handleSickLeaveEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSickLeave({ ...sickLeave, endDate: formatDate(new Date(event.target.value).toISOString()) });    
    };

    const fetchDiagnoses = async () => {
        const diagnoses = await diagnosesService.getAll();
        setDiagnoses(diagnoses)
    }
    void fetchDiagnoses();


    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        switch (type) {
            case EntryType.HealthCheck:
                const healthCheckEntry: Omit<HealthCheckEntry, "id"> = {
                    description,
                    date,
                    specialist,
                    type,
                    healthCheckRating
                };
                if (diagnosisCodes.length > 0) {
                    healthCheckEntry.diagnosisCodes = diagnosisCodes;
                };
                onSubmit(healthCheckEntry);
                break;
            case EntryType.Hospital:
                const hospitalEntry: Omit<HospitalEntry, "id"> = {
                    description,
                    date,
                    specialist,
                    type,
                    discharge
                };
                if (diagnosisCodes.length > 0) {
                    hospitalEntry.diagnosisCodes = diagnosisCodes;
                };
                onSubmit(hospitalEntry);
                break;
            case EntryType.OccupationalHealthcare:
                const occupationalEntry: Omit<OccupationalHealthcareEntry, "id"> = {
                    description,
                    date,
                    specialist,
                    type,
                    employerName,
                };

                if (diagnosisCodes.length > 0) {
                    occupationalEntry.diagnosisCodes = diagnosisCodes;
                }

                if (sickLeave.endDate !== '') {
                    occupationalEntry.sickLeave = sickLeave;
                }

                onSubmit(occupationalEntry);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <FormControl sx={{ m: 1, width: 550 }}>
                    <RadioGroup row aria-label="type" name="type" value={type} onChange={handleTypeChange}>
                        <FormControlLabel value={EntryType.HealthCheck} control={<Radio />} label="Health Check" />
                        <FormControlLabel value={EntryType.Hospital} control={<Radio />} label="Hospital" />
                        <FormControlLabel value={EntryType.OccupationalHealthcare} control={<Radio />} label="Occupational Healthcare" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ m: 1, width: 550 }}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 550 }}>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 550 }}>
                    <TextField
                        label="Specialist"
                        fullWidth
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 550 }}>
                    <InputLabel id="multiple-checkbox-label">Diagnosis Codes</InputLabel>
                    <Select
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={diagnosisCodes}
                        onChange={handleChange}
                        input={<OutlinedInput label="Diagnosis Codes" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {diagnoses.map((d) => (
                            <MenuItem key={d.code} value={d.code}>
                                <Checkbox checked={diagnosisCodes.includes(d.code)} />
                                <ListItemText primary={d.code} secondary={d.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {type === EntryType.HealthCheck && (
                    <FormControl sx={{ m: 1, width: 550, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Slider
                                min={-0.15}
                                max={3.2}
                                defaultValue={0}
                                value={healthCheckRating}
                                step={null}
                                valueLabelDisplay="auto"
                                marks={HealthCheckRatingOptions}
                                onChange={(_, newValue) => setHealthCheckRating(newValue as number)}
                            />
                        </Box>
                    </FormControl>
                )}
                {type === EntryType.Hospital && (
                    <>
                        <FormControl sx={{ m: 1, width: 550 }}>
                            <TextField
                                label="Discharge Date"
                                type="date"
                                value={discharge.date}
                                onChange={handleDischargeDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 550 }}>
                            <TextField
                                label="Discharge Criteria"
                                fullWidth
                                value={discharge.criteria}
                                onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
                            />
                        </FormControl>
                    </>
                )}
                {type === EntryType.OccupationalHealthcare && (
                    <div>
                        <FormControl sx={{ m: 1, width: 550 }}>
                            <TextField
                                label="Employer Name"
                                fullWidth
                                value={employerName}
                                onChange={({ target }) => setEmployerName(target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 550 }}>
                            <TextField
                                label="Sickleave Start Date"
                                type="date"
                                value={sickLeave.startDate}
                                onChange={handleSickLeaveStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 550 }}>
                            <TextField
                                label="Sickleave End Date"
                                type="date"
                                value={sickLeave.endDate}
                                onChange={handleSickLeaveEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </div>
                )}

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;