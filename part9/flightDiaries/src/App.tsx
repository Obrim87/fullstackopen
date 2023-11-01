import axios from 'axios';
import { useEffect, useState } from 'react';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import { DiaryEntry } from './types';
const baseUrl = 'http://localhost:3000';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/diaries`)
      .then((response) => {
        setDiaryEntries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Flight Diary App</h1>
      <h2>Add New Entry</h2>
      <Notification message={message} />
      <DiaryForm setMessage={setMessage} />
      <h2>Diary Entries</h2>
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
