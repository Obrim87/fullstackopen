import {
  PublicPatientRecord,
  PatientRecord,
  NewPatientRecord,
  Entry
} from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPublicPatientData = (): PublicPatientRecord[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};

const getSinglePublicPatientData = (id: string): PatientRecord | undefined => {
  return patientData.find((patient) => {
    if (id === patient.id) {
      return patient;
    }
    return undefined;
  });
};

const addPatientData = ({
  name,
  occupation,
  ssn,
  dateOfBirth,
  gender
}: NewPatientRecord): PatientRecord => {
  const newId: string = uuid();
  const newPatient = {
    id: newId,
    name: name,
    occupation: occupation,
    ssn: ssn,
    dateOfBirth: dateOfBirth,
    gender: gender,
    entries: []
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntryData = (props: Entry, patientId: string): Entry => {
  const entry = patientData.find((patient) => patient.id === patientId);

  if (entry) {
    patientData.forEach((patient) => {
      if (patient.id === patientId) {
        patient.entries?.push(props);
      }
    });
    return props;
  }
  throw new Error('Patient not found.');
};

export default {
  getPublicPatientData,
  addPatientData,
  getSinglePublicPatientData,
  addEntryData
};
