import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';
import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

interface DiagnosisCodesFieldProps {
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosisCodesField = ({
  diagnosisCodes,
  setDiagnosisCodes
}: DiagnosisCodesFieldProps) => {
  const theme = useTheme();
  const [getCodes, setGetCodes] = useState<Diagnosis[]>();
  let codes: string[] = [];

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setGetCodes(response.data));
  }, []);

  if (getCodes) {
    codes = getCodes.map((item) => item.code);
  } else {
    codes = ['Codes not found'];
  }

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id='diagnosisSelect'>Diagnosis Codes</InputLabel>
        <Select
          labelId='diagnosisSelectLabel'
          id='diagnosisSelect'
          multiple
          value={diagnosisCodes}
          onChange={(e) =>
            setDiagnosisCodes(
              typeof e.target.value === 'string'
                ? e.target.value.split(',')
                : e.target.value
            )
          }
          input={<OutlinedInput label='Diagnosis Codes' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {codes.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, diagnosisCodes, theme)}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisCodesField;
