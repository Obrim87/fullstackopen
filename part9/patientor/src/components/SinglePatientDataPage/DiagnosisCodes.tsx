import { useEffect, useState } from 'react';
import { Diagnosis } from '../../types';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';

const DiagnosisCodes = ({ diagnosisCodes }: { diagnosisCodes: string[] }) => {
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[]>();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setDiagnosisData(response.data));
  }, []);

  const findDiagnosis = (code: string) => {
    const result = diagnosisData?.find((item) => item.code === code);
    return result ? result.name : 'Diagnosis not found';
  };

  return (
    <>
      Diagnostic Codes:
      {diagnosisCodes &&
        diagnosisCodes.map((code) => (
          <div key={code}>
            <ul>
              <li>
                {code}: {diagnosisData && findDiagnosis(code)}
              </li>
            </ul>
          </div>
        ))}
    </>
  );
};

export default DiagnosisCodes;
