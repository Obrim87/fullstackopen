import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Route, Link, Routes } from 'react-router-dom';
import {
  Button,
  Divider,
  Container,
  Typography,
  AlertColor
} from '@mui/material';

import { apiBaseUrl } from './constants';
import { NotificationContextType, Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import SinglePatientData from './components/SinglePatientDataPage/SinglePatientData';
import Notification from './components/Notification';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-au';

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertColor | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className='App'>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-au'}>
        <NotificationContext.Provider value={{ setMessage, setType }}>
          <Container>
            <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
              Patientor
            </Typography>
            <Button
              sx={{ marginBottom: '30px' }}
              component={Link}
              to='/'
              variant='contained'
              color='primary'>
              Home
            </Button>
            {type && <Notification message={message} type={type} />}
            <Divider hidden />
            <Routes>
              <Route
                path='/'
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route path='/api/patients/:id' element={<SinglePatientData />} />
            </Routes>
          </Container>
        </NotificationContext.Provider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
