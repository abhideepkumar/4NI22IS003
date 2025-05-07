import { useState, useEffect } from 'react';
import axios from 'axios';

function PopularPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/posts?type=popular`);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch popular posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Most Popular Posts</h2>
      <ul className="data-list">
        {posts.map((post) => (
          <li key={post.id} className="data-item">
            <div>
              <strong>{post.title}</strong>
              <div>By: {post.userName}</div>
            </div>
            <span>Comments: {post.commentCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularPosts;