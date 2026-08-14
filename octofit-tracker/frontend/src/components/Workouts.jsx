import { useEffect, useState } from 'react';
import { fetchCollectionByUrl } from '../lib/api';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const items = await fetchCollectionByUrl(workoutsEndpoint, 'workouts');
        setWorkouts(items);
        setStatus('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts');
        setStatus('error');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="panel">
      <h2>Workouts</h2>
      {status === 'loading' && <p>Loading workouts...</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && (
        <ul className="list">
          {workouts.length === 0 && <li>No workout suggestions yet.</li>}
          {workouts.map((workout, index) => (
            <li key={workout._id || workout.id || index}>
              <strong>{workout.title || workout.name || `Workout ${index + 1}`}</strong>
              <span>{workout.goal || workout.difficulty || 'Workout data available'}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
