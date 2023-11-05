import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import { Patient, SinglePatientContextType } from '../../types';
import MainData from './MainData';
import Entries from './Entries';

export const SinglePatientContext =
  createContext<SinglePatientContextType | null>(null);

const SinglePatientData = () => {
  const [singlePatientData, setSinglePatientData] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((response) => setSinglePatientData(response.data));
  }, [id]);
  console.log(singlePatientData);

  return (
    <div>
      {!singlePatientData ||
      Object.keys(singlePatientData).includes('Error') ? (
        <p>Patient not found.</p>
      ) : (
        <SinglePatientContext.Provider
          value={{ singlePatientData, setSinglePatientData }}>
          <MainData singlePatientData={singlePatientData} />
          <Entries />
        </SinglePatientContext.Provider>
      )}
    </div>
  );
};

export default SinglePatientData;
