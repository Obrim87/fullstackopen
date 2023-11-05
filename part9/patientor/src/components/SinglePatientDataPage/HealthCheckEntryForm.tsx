import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';

interface HealthCheckEntryFormProps {
  healthCheckRating: string;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckEntryForm = ({
  healthCheckRating,
  setHealthCheckRating
}: HealthCheckEntryFormProps) => {
  return (
    <FormControl>
      <FormLabel id='healthRatingRadioGroup'>Healthcheck Rating</FormLabel>
      <RadioGroup
        row
        aria-labelledby='healthRatingRadioGroupLabel'
        name='healthRatingRadioGroup'
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(e.target.value)}>
        <FormControlLabel value={'0'} control={<Radio />} label='Healthy' />
        <FormControlLabel value={'1'} control={<Radio />} label='Low Risk' />
        <FormControlLabel value={'2'} control={<Radio />} label='High Risk' />
        <FormControlLabel
          value={'3'}
          control={<Radio />}
          label='Critical Risk'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default HealthCheckEntryForm;

// <div>
//   <TextField
//     sx={{ width: 200 }}
//     id='outlined-basic'
//     label='Healthcheck Rating'
//     variant='standard'
//     margin='normal'
//     required
//     value={healthCheckRating}
//     onChange={(e) => setHealthCheckRating(e.target.value)}
//   />
//   <br />
// </div>
