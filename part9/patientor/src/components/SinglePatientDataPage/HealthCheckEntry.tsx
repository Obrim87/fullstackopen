import { HealthCheckEntry as HealthCheckEntryType } from '../../types';
import { Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DiagnosisCodes from './DiagnosisCodes';
import convertDate from '../../utils/convertDate';

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntryType }) => {
  if (!entry.date) throw new Error('Date missing');

  const healthCheckRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon sx={{ color: 'green' }} />;
      case 1:
        return <FavoriteIcon sx={{ color: 'grey' }} />;
      case 2:
        return <FavoriteIcon sx={{ color: 'yellow' }} />;
      case 3:
        return <FavoriteIcon sx={{ color: 'red' }} />;
      default:
        break;
    }
  };

  return (
    <Container
      sx={{
        border: 'black 2px solid',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px'
      }}>
      <ul>
        <li>
          Date: {convertDate(entry.date)} <MonitorHeartIcon />
        </li>
        <li>{entry.description}</li>
        <li>Attending physician: {entry.specialist}</li>
        <li>{healthCheckRatingIcon(entry.healthCheckRating)}</li>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        )}
      </ul>
    </Container>
  );
};

export default HealthCheckEntry;
