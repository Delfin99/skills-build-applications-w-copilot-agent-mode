import { useEffect, useState } from 'react';
import { fetchCollectionByUrl } from '../lib/api';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const items = await fetchCollectionByUrl(teamsEndpoint, 'teams');
        setTeams(items);
        setStatus('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
        setStatus('error');
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="panel">
      <h2>Teams</h2>
      {status === 'loading' && <p>Loading teams...</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && (
        <ul className="list">
          {teams.length === 0 && <li>No teams created yet.</li>}
          {teams.map((team, index) => (
            <li key={team._id || team.id || index}>
              <strong>{team.name || `Team ${index + 1}`}</strong>
              <span>{team.membersCount ? `${team.membersCount} members` : team.description || 'Team data available'}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
