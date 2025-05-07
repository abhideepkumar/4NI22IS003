# Social Media Analytics Backend

This is an Express.js backend service that provides analytics APIs for a social media platform.

## Features

- Top Users: API to get the top five users with the highest number of comments on their posts.
- Popular Posts: API to get posts with the maximum number of comments.
- Latest Posts: API to get the latest posts.

## Endpoints

- `GET /users` — Returns the top 5 users with the most commented posts.
- `GET /posts?type=popular` — Returns the post(s) with the highest number of comments.
- `GET /posts?type=latest` — Returns the latest 5 posts.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Set up your environment variables in a `.env` file (e.g., `API_TOKEN`).

3. Start the server:
   ```
   npm start
   ```

4. The server will run on http://localhost:8080.

## Notes

- The backend fetches data from an external evaluation service using an API token.
- Make sure your `.env` file is properly configured.
