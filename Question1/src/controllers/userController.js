import apiService from '../services/apis.js';

class UserController {
  // Get top 5 users with the most commented posts
  async getTopUsers(req, res) {
    try {
      // Get all users
      const users = await apiService.getAllUsers();
      const userCommentCounts = [];
      
      // Process each user to find their comment counts
      for (const userId in users) {
        // Get all posts for this user
        const userPosts = await apiService.getUserPosts(userId);
        let totalComments = 0;
        
        // For each post, get and count comments
        for (const post of userPosts) {
          const postComments = await apiService.getPostComments(post.id);
          // Add the comment count for this post to the user's total
          totalComments += postComments ? postComments.length : 0;
        }
        
        // Store the user data with their comment count
        userCommentCounts.push({
          id: userId,
          name: users[userId],
          totalComments: totalComments,
          postCount: userPosts.length
        });
      }
      
      // Sort users by total comment count in descending order
      userCommentCounts.sort((a, b) => b.totalComments - a.totalComments);
      
      // Return the top 5 users
      const topUsers = userCommentCounts.slice(0, 5);
      
      res.json({ topUsers });
    } catch (error) {
      console.error('Error getting top users:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();