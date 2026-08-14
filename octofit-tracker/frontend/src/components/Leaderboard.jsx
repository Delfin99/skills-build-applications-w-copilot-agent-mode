import { useEffect, useState } from 'react';
import { fetchCollectionByUrl } from '../lib/api';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const items = await fetchCollectionByUrl(leaderboardEndpoint, 'leaderboard');
        setEntries(items);
        setStatus('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
        setStatus('error');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="panel">
      <h2>Leaderboard</h2>
      {status === 'loading' && <p>Loading leaderboard...</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && (
        <ol className="list ordered">
          {entries.length === 0 && <li>No leaderboard entries yet.</li>}
          {entries.map((entry, index) => (
            <li key={entry._id || entry.id || index}>
              <strong>{entry.userName || entry.name || `Athlete ${index + 1}`}</strong>
              <span>{entry.score ?? entry.points ?? 0} pts</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
