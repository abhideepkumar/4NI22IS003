import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const AUTH_TOKEN = process.env.API_TOKEN;

// Create axios instance with default headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

class ApiService {
  // Get all users 
  async getAllUsers() {
    try {
      const { data } = await api.get('/users');
      return data.users;
    } catch (error) {
      console.error('Users fetch failed:', error.message);
      throw error;
    }
  }
  
  // Get user posts
  async getUserPosts(userId) {
    try {
      const { data } = await api.get(`/users/${userId}/posts`);
      return data.posts;
    } catch (error) {
      console.error(`Posts fetch failed for user ${userId}:`, error.message);
      throw error;
    }
  }
  
  // Get post comments
  async getPostComments(postId) {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      return data.comments;
    } catch (error) {
      console.error(`Comments fetch failed for post ${postId}:`, error.message);
      throw error;
    }
  }
}

export default new ApiService();