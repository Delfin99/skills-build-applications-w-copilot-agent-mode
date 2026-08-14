import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const items = await fetchCollection('users');
        setUsers(items);
        setStatus('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users');
        setStatus('error');
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="panel">
      <h2>Users</h2>
      {status === 'loading' && <p>Loading users...</p>}
      {status === 'error' && <p className="error">{error}</p>}
      {status === 'ready' && (
        <ul className="list">
          {users.length === 0 && <li>No users found yet.</li>}
          {users.map((user, index) => (
            <li key={user._id || user.id || index}>
              <strong>{user.name || user.username || `User ${index + 1}`}</strong>
              <span>{user.email || user.level || 'Profile data available'}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
