import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const items = await fetchCollection('activities');
        setActivities(items);
        setStatus('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
        setStatus('error');
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="panel">
      <h2>Activities</h2>
      {status === 'loading' && <p>Loading activities...</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && (
        <ul className="list">
          {activities.length === 0 && <li>No activities logged yet.</li>}
          {activities.map((activity, index) => (
            <li key={activity._id || activity.id || index}>
              <strong>{activity.type || activity.name || `Activity ${index + 1}`}</strong>
              <span>{activity.duration ? `${activity.duration} min` : activity.date || 'Activity data available'}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
