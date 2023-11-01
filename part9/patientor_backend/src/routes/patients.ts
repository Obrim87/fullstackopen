import express from 'express';
import publicPatientData from '../services/patientService';
import { toNewPatientData } from '../utils/patientRecordUtils';
import { toNewEntryData } from '../utils/entryRecordUtils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(publicPatientData.getPublicPatientData());
});

router.get('/:id', (req, res) => {
  const patientData = publicPatientData.getSinglePublicPatientData(
    req.params.id
  );
  if (!patientData) res.json({ Error: 'Patient not found.' });
  res.json(patientData);
});

router.post('/', (req, res) => {
  const newPatientData = toNewPatientData(req.body);
  res.json(publicPatientData.addPatientData(newPatientData));
});

router.post('/:id/entries', (req, res) => {
  const newEntryData = toNewEntryData(req.body);
  res.json(
    publicPatientData.addEntryData(toNewEntryData(newEntryData), req.params.id)
  );
});

export default router;
