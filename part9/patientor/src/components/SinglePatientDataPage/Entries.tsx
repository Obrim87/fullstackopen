import { useContext, useState } from 'react';
import { Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import EntryForm from './EntryForm';
import { Button } from '@mui/material';
import { SinglePatientContext } from './SinglePatientData';

const Entries = () => {
  const singlePatientContext = useContext(SinglePatientContext);
  const [toggleForm, setToggleForm] = useState(false);

  // null cannot be destructured so must check that context !== null first
  if (!singlePatientContext)
    throw new Error('Patient context cannot equal null');
  const { singlePatientData } = singlePatientContext;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
      case 'Hospital':
        return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      {toggleForm ? (
        <EntryForm
          id={singlePatientData.id}
          setToggleForm={setToggleForm}
          toggleForm={toggleForm}
        />
      ) : (
        <Button
          variant='contained'
          type='button'
          color='primary'
          sx={{ marginTop: 2, marginLeft: 1 }}
          onClick={() => setToggleForm(!toggleForm)}>
          Add New Entry
        </Button>
      )}
      <h3>Entries:</h3>
      {singlePatientData.entries &&
        singlePatientData.entries.map((data) => (
          <div key={data.id}>
            <EntryDetails entry={data} />
          </div>
        ))}
    </div>
  );
};

export default Entries;
