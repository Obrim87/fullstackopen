import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '../types';
import { v1 as uuid } from 'uuid';
import {
  parseDescription,
  parseDiagnosisCodes,
  parseDate,
  parseHealthCheckRating,
  parseSpecialist,
  parseCriteria,
  parseEmployerName
} from './utils';

export const toNewEntryData = (object: unknown): Entry => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }

  switch (object.type) {
    case 'HealthCheck':
      return toNewHealthCheckEntry(object as HealthCheckEntry);
    case 'Hospital':
      return toNewHospitalEntry(object as HospitalEntry);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(
        object as OccupationalHealthcareEntry
      );
    default:
      assertNever(object.type as never);
  }
  throw new Error('Incorrect or missing data');
};

const toNewHealthCheckEntry = (object: HealthCheckEntry): HealthCheckEntry => {
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    'healthCheckRating' in object
  ) {
    const newId = uuid();
    const newHealthCheckEntry = {
      id: newId,
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type as 'HealthCheck',
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newHealthCheckEntry;
  }
  throw new Error('Incorrect or missing data');
};

const toNewHospitalEntry = (object: HospitalEntry): HospitalEntry => {
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    'discharge' in object &&
    'date' in object.discharge &&
    'criteria' in object.discharge
  ) {
    const newId = uuid();
    const newHealthCheckEntry = {
      id: newId,
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type as 'Hospital',
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseCriteria(object.discharge.criteria)
      }
    };
    return newHealthCheckEntry;
  }
  throw new Error('Incorrect or missing data');
};

const toNewOccupationalHealthcareEntry = (
  object: OccupationalHealthcareEntry
): OccupationalHealthcareEntry => {
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object &&
    'employerName' in object
  ) {
    const newId = uuid();
    const newOccupationalHealthcareEntry = {
      id: newId,
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: object.type as 'OccupationalHealthcare',
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      employerName: parseEmployerName(object.employerName),
      sickLeave: object.sickLeave
        ? {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate)
          }
        : undefined
    };
    return newOccupationalHealthcareEntry;
  }
  throw new Error('Incorrect or missing data');
};
