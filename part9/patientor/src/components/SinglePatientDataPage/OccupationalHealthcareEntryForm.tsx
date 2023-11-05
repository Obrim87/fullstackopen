import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

interface OccupationalHealthcareEntryFormProps {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickStartDate: Dayjs | null;
  setSickStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  sickEndDate: Dayjs | null;
  setSickEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

const OccupationalHealthcareEntryForm = (
  props: OccupationalHealthcareEntryFormProps
) => {
  const [toggleSickLeave, setToggleSickLeave] = useState(false);

  return (
    <div>
      <TextField
        sx={{ width: 225 }}
        id='outlined-basic'
        label='Employer Name'
        margin='normal'
        required
        value={props.employerName}
        onChange={(e) => props.setEmployerName(e.target.value)}
      />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={toggleSickLeave}
            onChange={() => setToggleSickLeave(!toggleSickLeave)}
          />
        }
        label='Sick Leave?'
      />
      <br />
      {toggleSickLeave && (
        <>
          <DatePicker
            label='Sick Leave Start Date'
            sx={{ marginTop: 2 }}
            value={props.sickStartDate}
            onChange={(value) => props.setSickStartDate(value)}
          />
          <br />
          <DatePicker
            label='Sick Leave End Date'
            sx={{ marginTop: 2 }}
            value={props.sickEndDate}
            onChange={(value) => props.setSickEndDate(value)}
          />
        </>
      )}
      <br />
    </div>
  );
};

export default OccupationalHealthcareEntryForm;
