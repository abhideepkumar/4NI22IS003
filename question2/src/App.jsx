import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsers from "./components/TopUsers";
import PopularPosts from "./components/PopularPosts";
import LatestPosts from "./components/LatestPosts";
import "./App.css";
import dotenv from 'dotenv';

dotenv.config();


function App() {
  return (
    <Router>
      <div style={{color: 'red'}}>
        <h1>Choose the analytics option to see the data of that graph.</h1>
        <h6>
          This will not work if backend is not working due to any reason like
          auth issue or 503 status code(request failed due to overloaded)
        </h6>
      </div>
      <div className="app">
        <nav className="nav-buttons">
          <Link to="/top-users" className="nav-button">
            Top Users
          </Link>
          <Link to="/popular-posts" className="nav-button">
            Popular Posts
          </Link>
          <Link to="/latest-posts" className="nav-button">
            Latest Posts
          </Link>
        </nav>

        <Routes>
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/popular-posts" element={<PopularPosts />} />
          <Route path="/latest-posts" element={<LatestPosts />} />
          {/* <Route path="/" element={<TopUsers />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
