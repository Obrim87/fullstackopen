import { DiaryEntry } from '../types';

// const diaryEntry = () => {
//   return (
//     <div>

//     </div>
//   );
// };

const DiaryEntries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
            <br />
            comment: {entry.comment}
          </p>
        </div>
      ))}
    </>
  );
};

export default DiaryEntries;
