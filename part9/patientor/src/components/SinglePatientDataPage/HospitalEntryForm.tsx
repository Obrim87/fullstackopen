import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

interface HospitalEntryFormProps {
  dischargeDate: Dayjs | null;
  setDischargeDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalEntryForm = (props: HospitalEntryFormProps) => {
  return (
    <div>
      <DatePicker
        label='Discharge Date'
        sx={{ marginTop: 2 }}
        value={props.dischargeDate}
        onChange={(value) => props.setDischargeDate(value)}
      />
      <br />
      <TextField
        sx={{ width: 500 }}
        id='outlined-basic'
        label='Discharge Criteria'
        margin='normal'
        required
        multiline
        value={props.dischargeCriteria}
        onChange={(e) => props.setDischargeCriteria(e.target.value)}
      />
      <br />
    </div>
  );
};

export default HospitalEntryForm;
