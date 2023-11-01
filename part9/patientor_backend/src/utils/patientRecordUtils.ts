import { NewPatientRecord } from '../types';
import {
  parseDate,
  parseGender,
  parseName,
  parseOccupation,
  parseSsn
} from './utils';

export const toNewPatientData = (object: unknown): NewPatientRecord => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'dateOfBirth' in object &&
    'gender' in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender)
    };
    return newPatient;
  }
  throw new Error('Incorrect or missing data');
};
