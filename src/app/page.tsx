"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import RepoList from "@/components/RepoList";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
}

const Home = () => {
  const [orgName, setOrgName] = useState<string>("apache"); // Default organization
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRepos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<Repo[]>(
        `https://api.github.com/orgs/${orgName}/repos`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );
      setRepos(
        response.data.sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
      );
    } catch (err) {
      setError("Failed to fetch repositories.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRepos();
  }, [orgName]);

  const handleOrgNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
  };

  return (
    <div>
      <h1>GitHub Projects Browser</h1>
      <input
        type="text"
        value={orgName}
        onChange={handleOrgNameChange}
        placeholder="Enter GitHub organization name"
      />
      <button onClick={fetchRepos}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <RepoList repos={repos} />
    </div>
  );
};

export default Home;
