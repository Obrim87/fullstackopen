import { Container } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../../types';
import DiagnosisCodes from './DiagnosisCodes';
import convertDate from '../../utils/convertDate';

const OccupationalHealthcareEntry = ({
  entry
}: {
  entry: OccupationalHealthcareEntryType;
}) => {
  if (!entry.date) throw new Error('Date missing');

  return (
    <Container
      sx={{
        border: 'black 2px solid',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px'
      }}>
      <ul>
        <li>
          Date: {convertDate(entry.date)} <EngineeringIcon />
        </li>
        <li>{entry.description}</li>
        <li>Attending physician: {entry.specialist}</li>
        <li>Employer Name: {entry.employerName}</li>
        {entry.sickLeave?.startDate && (
          <>
            <li>
              Sick leave start: {convertDate(entry.sickLeave?.startDate)}{' '}
            </li>
            <li>Sick leave end: {convertDate(entry.sickLeave?.endDate)} </li>
          </>
        )}
        {entry.diagnosisCodes && (
          <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        )}
      </ul>
    </Container>
  );
};

export default OccupationalHealthcareEntry;
