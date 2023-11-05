import { DiagnosesRecord, Gender, HealthCheckRating } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number';
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(value);
};

const isRating = (value: unknown): value is HealthCheckRating => {
  return value === 0 || value === 1 || value === 2 || value === 3;
};

export const parseName = (name: unknown): string => {
  if (name && isString(name)) return name;
  throw new Error('Incorrect or missing Name');
};

export const parseOccupation = (occupation: unknown): string => {
  if (occupation && isString(occupation)) return occupation;
  throw new Error('Incorrect or missing Occupation');
};

export const parseDescription = (description: unknown): string => {
  if (description && isString(description)) return description;
  throw new Error('Incorrect or missing Description');
};

export const parseSpecialist = (specialist: unknown): string => {
  if (specialist && isString(specialist)) return specialist;
  throw new Error('Incorrect or missing Specialist');
};

export const parseCriteria = (criteria: unknown): string => {
  if (criteria && isString(criteria)) return criteria;
  throw new Error('Incorrect or missing Criteria');
};

export const parseEmployerName = (name: unknown): string => {
  if (name && isString(name)) return name;
  throw new Error('Incorrect or missing Employer Name');
};

export const parseSsn = (ssn: unknown): string => {
  const regex = /^[a-zA-Z0-9]{6}-[a-zA-Z0-9]{3,4}$/gm;

  if (isString(ssn) && ssn.match(regex)) return ssn;

  throw new Error(
    'Incorrect or missing SSN. Use either XXXXXX-XXX or XXXXXX-XXXX format'
  );
};

export const parseDate = (date: unknown): string => {
  // regex check to make sure date is in YYYY-MM-DD format
  const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gm;
  if (isString(date) && date.match(regex)) return date;

  throw new Error(
    `A date you entered, ${date} is either missing or incorrect.`
  );
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing Gender');
  }
  return gender;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isRating(rating))
    throw new Error(`Incorrect or missing Health Rating: ${rating}`);
  return rating;
};

export const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<DiagnosesRecord['code']> => {
  if (!diagnosisCodes || typeof diagnosisCodes !== 'object') {
    return [] as Array<DiagnosesRecord['code']>;
  }
  return diagnosisCodes as Array<DiagnosesRecord['code']>;
};

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${value}`);
};
