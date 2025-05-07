import { useState, useEffect } from 'react';
import axios from 'axios';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/users`);
        setUsers(response.data.topUsers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Top Users by Comments</h2>
      <ul className="data-list">
        {users.map((user) => (
          <li key={user.id} className="data-item">
            <span>{user.name}</span>
            <span>Comments: {user.totalComments} | Posts: {user.postCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopUsers;