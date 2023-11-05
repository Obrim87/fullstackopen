import { Container } from '@mui/material';
import { HospitalEntry as HospitalEntryType } from '../../types';
import DiagnosisCodes from './DiagnosisCodes';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import convertDate from '../../utils/convertDate';

const HospitalEntry = ({ entry }: { entry: HospitalEntryType }) => {
  if (!entry.date) throw new Error('Date missing');
  return (
    <Container
      sx={{
        border: 'black 2px solid',
        borderRadius: '5px',
        margin: '10px'
      }}>
      <ul>
        <li>
          Date: {convertDate(entry.date)} <LocalHospitalIcon />
        </li>
        <li>{entry.description}</li>
        <li>Attending physician: {entry.specialist}</li>
        <li>Discharged on: {convertDate(entry.discharge.date)}</li>
        <li>Discharge criteria: {entry.discharge.criteria}</li>
        {entry.diagnosisCodes && (
          <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        )}
      </ul>
    </Container>
  );
};

export default HospitalEntry;
