import diaries from '../../data/entries';
import { DiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return diaries.map((entry) => ({
//     id: entry.id,
//     date: entry.date,
//     weather: entry.weather,
//     visibility: entry.visibility
//   }));
// };

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: diaries.length + 1,
    ...entry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((diary) => diary.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  findById
};
