import apiService from '../services/apis.js';

class PostController {
  // Get posts based on type query parameter (popular or latest)
  async getPosts(req, res) {
    try {
      const type = req.query.type || 'latest'; // Default to latest if not specified
      
      // Validate the type parameter
      if (type !== 'popular' && type !== 'latest') {
        return res.status(400).json({ 
          error: 'Invalid type parameter. Accepted values: popular, latest' 
        });
      }
      
      // Get all users
      const users = await apiService.getAllUsers();
      let allPosts = [];
      
      // Get all posts from all users with their metadata
      for (const userId in users) {
        const userPosts = await apiService.getUserPosts(userId);
        
        // Add author name to each post
        const postsWithAuthor = userPosts.map(post => ({
          ...post,
          userName: users[userId]
        }));
        
        allPosts = allPosts.concat(postsWithAuthor);
      }
      
      // Handle based on requested type
      if (type === 'popular') {
        return this.handlePopularPosts(res, allPosts);
      } else {
        return this.handleLatestPosts(res, allPosts);
      }
    } catch (error) {
      console.error('Error getting posts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle popular posts logic (with maximum number of comments)
  async handlePopularPosts(res, allPosts) {
    try {
      // For each post, get and count comments
      const postsWithCommentCounts = [];
      for (const post of allPosts) {
        const comments = await apiService.getPostComments(post.id);
        postsWithCommentCounts.push({
          ...post,
          commentCount: comments ? comments.length : 0
        });
      }
      
      // Find maximum comment count
      let maxCommentCount = 0;
      for (const post of postsWithCommentCounts) {
        if (post.commentCount > maxCommentCount) {
          maxCommentCount = post.commentCount;
        }
      }
      
      // Get all posts with the maximum comment count
      const mostCommentedPosts = postsWithCommentCounts.filter(
        post => post.commentCount === maxCommentCount
      );
      
      res.json({ posts: mostCommentedPosts });
    } catch (error) {
      console.error('Error handling popular posts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // Handle latest posts logic
  async handleLatestPosts(res, allPosts) {
    try {
      // Sort posts by ID in descending order (assuming higher ID means newer post)
      allPosts.sort((a, b) => b.id - a.id);
      
      // Return top 5 posts
      const latestPosts = allPosts.slice(0, 5);
      
      res.json({ posts: latestPosts });
    } catch (error) {
      console.error('Error handling latest posts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new PostController();