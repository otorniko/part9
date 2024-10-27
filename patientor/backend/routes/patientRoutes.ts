import { Router } from "express";
import { z } from 'zod';
import { NewPatientSchema } from "../validation/patientValidation";
import patientService from "../services/patientService";
import { newEntrySchema } from "../validation/entryValidation";

const router = Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSecurePatients());
});
  
router.post('/', (req, res) => {
    try {
        const newPatient = NewPatientSchema.parse({ entries: [], ...req.body });
        console.log(newPatient);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          console.error(error);
      console.log(req.body);

          res.status(400).send({ error: error.issues });
        } else {
          console.error(error);
          res.status(400).send({ error: 'unknown error' });
        }
      }
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send({ error: 'Patient not found' });
    }
});

router.post('/:id/entries', (req, res) => {
  try {
    const toNewEntry = newEntrySchema.parse(req.body);
    const entry = patientService.addEntry(req.params.id, toNewEntry);
    res.json(entry);
    
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error(error);
      res.status(400).send({ error: error.issues });
    } else {
      console.error(error);
      res.status(400).send({ error: 'unknown error' });
  }
}});

/*
app.get('/api/patients', (_req, res) => {
  const securePatients = data.patients.map(({ ssn, ...rest }) => rest);
  res.json(securePatients);
});

app.get('/api/patients/:id', (req, res) => {
  const patient = data.patients.find(p => req.params.id === p.id);
  res.json(patient);
});

app.post('/api/patients', (req, res) => {
  const { patientEntry } = req.body;
  const id = uuid();
  const patientData: Patient = {...patientEntry, id: id};
  data.patients.concat(patientData);
  res.sendStatus(200);
});

app.post('/api/patients/:id/entries', (req, res) => {
  const { bodyEntry } = req.body;
  const entry = parsers.parseDiagnosisCodes(bodyEntry);
  try {
    const entrySuccess = patientService.addEntry(req.params.id, entry);
    res.status(201).send(entrySuccess);
  } catch (error: unknown) { 
    if (error instanceof Error && error.message === 'Patient not found') {
      res.status(404).send({ error: 'Patient not found' }); 
    } else {
      res.status(500).send({ error: 'Failed to add entry' }); 
    }
  }
});
*/
 
export default router;