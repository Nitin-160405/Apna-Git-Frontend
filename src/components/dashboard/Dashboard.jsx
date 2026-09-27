import { useEffect, useState } from "react";
import api from "../../api";
import './dashboard.css';
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await api.get(`/repo/user/${userId}`);

        const data = response.data;

        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error while fetching repositories:", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await api.get("/repo/all");

        const data = response.data;

        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching suggested repositories:", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  const searchResults = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (

    <><Navbar />

      <section id="dashboard">
        <aside>
          <h3>Suggest Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>

              </div>
            );
          })}
        </aside>

        <main>

          <h3>Your Repositories</h3 >
          <div id="search">
            <input type="text" value={searchQuery} placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)}></input>
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>

              </div>
            );
          })}
        </main>

        <aside>
          <h3>Upcoming Events</h3>

          <ul>
            <li>Tech Conference - Dec 15</li>
            <li>Developer Meetup - May 01</li>
            <li>React Summit - Dec 25</li>
            <li>Summer Hackathon - Oct 25</li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
