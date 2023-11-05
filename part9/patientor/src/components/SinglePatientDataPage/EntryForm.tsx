import { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from '../../constants';
import { NotificationContext } from '../../App';
import extractErrorMessage from '../../utils/extractErrorMessage';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import DiagnosisCodesField from './DiagnosisCodesField';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Patient } from '../../types';
import { SinglePatientContext } from './SinglePatientData';
import {
  Container,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

interface EntryFormProps {
  id: string;
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EntryForm = ({ id, toggleForm, setToggleForm }: EntryFormProps) => {
  const patientId = id;
  const notificationContext = useContext(NotificationContext);
  const singlePatientContext = useContext(SinglePatientContext);

  if (!singlePatientContext)
    throw new Error('Patient context cannot equal null');

  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickStartDate, setSickStartDate] = useState<Dayjs | null>(null);
  const [sickEndDate, setSickEndDate] = useState<Dayjs | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [entryFormType, setEntryFormType] = useState('healthCheck');
  const { singlePatientData, setSinglePatientData } = singlePatientContext;

  const handleChange = (
    e: React.MouseEvent<HTMLElement>,
    newEntryFormType: string | null
  ) => {
    if (newEntryFormType !== null) setEntryFormType(newEntryFormType);
  };

  const submitEntryForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newEntry;
    if (entryFormType === 'healthCheck') {
      newEntry = {
        id: patientId,
        description: description,
        date: date ? date.format().substring(0, 10) : undefined,
        specialist: specialist,
        type: 'HealthCheck',
        healthCheckRating: healthCheckRating
          ? Number(healthCheckRating)
          : undefined,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
      };
    } else if (entryFormType === 'occupationalHealthcare') {
      newEntry = {
        id: patientId,
        description: description,
        date: date ? date.format().substring(0, 10) : undefined,
        specialist: specialist,
        type: 'OccupationalHealthcare',
        employerName: employerName,
        sickLeave:
          sickStartDate && sickEndDate
            ? {
                startDate: sickStartDate.format().substring(0, 10),
                endDate: sickEndDate.format().substring(0, 10)
              }
            : undefined,
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
      };
    } else if (entryFormType === 'hospital') {
      newEntry = {
        id: patientId,
        description: description,
        date: date ? date.format().substring(0, 10) : undefined,
        specialist: specialist,
        type: 'Hospital',
        discharge: {
          date: dischargeDate
            ? dischargeDate.format().substring(0, 10)
            : undefined,
          criteria: dischargeCriteria
        },
        diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
      };
    }
    try {
      await axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);

      // adds newly created entry to copied data object
      const updatedSinglePatientData = {
        ...singlePatientData,
        entries: singlePatientData.entries
          ? [...singlePatientData.entries, newEntry]
          : undefined
      };

      // set new patient data asserting it as Patient type
      // this also displays the new data
      setSinglePatientData(updatedSinglePatientData as Patient);

      notificationContext?.setMessage('Entry created successfully!');
      notificationContext?.setType('success');
      setTimeout(() => {
        notificationContext?.setMessage('');
        notificationContext?.setType(null);
      }, 5000);

      setDescription('');
      setDate(null);
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes([]);
      setEmployerName('');
      setSickStartDate(null);
      setSickEndDate(null);
      setDischargeDate(null);
      setDischargeCriteria('');
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        notificationContext &&
        'setMessage' in notificationContext &&
        'setType' in notificationContext
      ) {
        console.log(error.response);
        notificationContext.setMessage(
          extractErrorMessage(error.response.data)
        );
        notificationContext.setType('error');
        return;
      }
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        border: 'black 2px solid',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px'
      }}>
      <h3>Create New Entry:</h3>
      <ToggleButtonGroup
        color='primary'
        value={entryFormType}
        exclusive
        onChange={handleChange}
        aria-label='Platform'>
        <ToggleButton value='healthCheck'>Health Check</ToggleButton>
        <ToggleButton value='occupationalHealthcare'>
          Occupational Healthcare
        </ToggleButton>
        <ToggleButton value='hospital'>Hospital</ToggleButton>
      </ToggleButtonGroup>
      <form onSubmit={submitEntryForm}>
        <DatePicker
          label='Date'
          sx={{ marginTop: 2 }}
          value={date}
          onChange={(value) => setDate(value)}
        />
        <br />
        <TextField
          sx={{ width: 225 }}
          id='outlined-basic'
          label='Attending Physician'
          margin='normal'
          required
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <br />
        {entryFormType === 'healthCheck' && (
          <HealthCheckEntryForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}
        {entryFormType === 'occupationalHealthcare' && (
          <OccupationalHealthcareEntryForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickStartDate={sickStartDate}
            setSickStartDate={setSickStartDate}
            sickEndDate={sickEndDate}
            setSickEndDate={setSickEndDate}
          />
        )}
        {entryFormType === 'hospital' && (
          <HospitalEntryForm
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        )}
        <br />
        <DiagnosisCodesField
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />
        <TextField
          sx={{ width: 500 }}
          id='outlined-basic'
          label='Description'
          margin='normal'
          required
          multiline
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Button variant='contained' type='submit' sx={{ marginTop: 1 }}>
          Add Entry
        </Button>
        <Button
          variant='contained'
          type='button'
          color='secondary'
          sx={{ marginTop: 1, marginLeft: 5 }}
          onClick={() => setToggleForm(!toggleForm)}>
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default EntryForm;
