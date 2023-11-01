import { SetStateAction, useState, Dispatch } from 'react';
import axios from 'axios';
const baseUrl = 'http://localhost:3000';

const DiaryForm = ({
  setMessage
}: {
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    };
    try {
      await axios.post(`${baseUrl}/api/diaries`, payload);
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
      setMessage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={submitForm}>
      date:{' '}
      <input
        type='date'
        name='date'
        value={date || ''}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      weather: <label htmlFor='sunny'>sunny</label>
      <input
        type='radio'
        id='sunny'
        name='weather'
        value='sunny'
        onChange={(e) => setWeather(e.target.value)}
        checked={weather === 'sunny'}
      />
      <label htmlFor='rainy'>rainy</label>
      <input
        type='radio'
        id='rainy'
        name='weather'
        value='rainy'
        onChange={(e) => setWeather(e.target.value)}
        checked={weather === 'rainy'}
      />
      <label htmlFor='cloudy'>cloudy</label>
      <input
        type='radio'
        id='cloudy'
        name='weather'
        value='cloudy'
        onChange={(e) => setWeather(e.target.value)}
        checked={weather === 'cloudy'}
      />
      <label htmlFor='stormy'>stormy</label>
      <input
        type='radio'
        id='stormy'
        name='weather'
        value='stormy'
        onChange={(e) => setWeather(e.target.value)}
        checked={weather === 'stormy'}
      />
      <label htmlFor='windy'>windy</label>
      <input
        type='radio'
        id='windy'
        name='weather'
        value='windy'
        onChange={(e) => setWeather(e.target.value)}
        checked={weather === 'windy'}
      />
      <br />
      visibility: <label htmlFor='great'>great</label>
      <input
        type='radio'
        id='great'
        name='visibility'
        value='great'
        onChange={(e) => setVisibility(e.target.value)}
        checked={visibility === 'great'}
      />
      <label htmlFor='good'>good</label>
      <input
        type='radio'
        id='good'
        name='visibility'
        value='good'
        onChange={(e) => setVisibility(e.target.value)}
        checked={visibility === 'good'}
      />
      <label htmlFor='ok'>ok</label>
      <input
        type='radio'
        id='ok'
        name='visibility'
        value='ok'
        onChange={(e) => setVisibility(e.target.value)}
        checked={visibility === 'ok'}
      />
      <label htmlFor='poor'>poor</label>
      <input
        type='radio'
        id='poor'
        name='visibility'
        value='poor'
        onChange={(e) => setVisibility(e.target.value)}
        checked={visibility === 'poor'}
      />
      <br />
      comment:{' '}
      <input
        type='text'
        name='comment'
        value={comment || ''}
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button type='submit'>Add</button>
    </form>
  );
};

export default DiaryForm;
