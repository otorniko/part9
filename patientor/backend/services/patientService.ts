import {
    NewPatient,
    Patient,
    SecurePatient,
    EntryWithoutId
  } from '../types';
  import data from './../data';
  import { v1 as uuid } from 'uuid'
  
  const getPatients = (): Patient[] => {
    return data.patients;
  };
  
  const getSecurePatients = (): SecurePatient[] => {
    return data.patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
  };
  
  const findById = (id: string): Patient | undefined => {
    const patient = data.patients.find(p => p.id === id);
    return patient;
  };
  
  const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
      id: uuid(),
      ...patient
    };
  
    data.patients.push(newPatient);
    return newPatient;
  };

  const addEntry = (patientId: string, entry: EntryWithoutId) => {
    const patient = findById(patientId);
    const newEntry = {
      id: uuid(),
      ...entry
    };
    patient?.entries.push(newEntry);
    return newEntry;
  }

  
  export default {
    getPatients,
    addPatient,
    getSecurePatients,
    findById,
    addEntry
  };