export interface DiagnosesRecord {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  // takes the code field from DiagnosesRecord type in case it ever changes
  // also uses the generic array syntax
  diagnosisCodes?: Array<DiagnosesRecord['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PublicPatientRecord = Omit<PatientRecord, 'ssn' | 'entries'>;
export type NewPatientRecord = Omit<PatientRecord, 'id'>;
