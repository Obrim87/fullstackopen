import { Patient } from '../../types';

const MainData = ({ singlePatientData }: { singlePatientData: Patient }) => {
  return (
    <>
      <span>
        <h2>
          {singlePatientData.name}{' '}
          {singlePatientData.gender === 'male' && (
            <img src='/images/male.png' alt='male' width={40} height={40} />
          )}
          {singlePatientData.gender === 'female' && (
            <img
              src='/images/feminine.png'
              alt='female'
              width={40}
              height={40}
            />
          )}
        </h2>
      </span>
      ssn: {singlePatientData.ssn}
      <br />
      occupation: {singlePatientData.occupation}
    </>
  );
};

export default MainData;
