"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CommitList from "../../../components/CommitList";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

const RepoCommits = ({ params }: { params: { repo: string } }) => {
  const { repo } = params;
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCommits = async () => {
    if (!repo) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<Commit[]>(
        `https://api.github.com/repos/apache/${repo}/commits`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );
      setCommits(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch commits.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCommits();
  }, [repo]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Recent Commits for {repo}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CommitList commits={commits} />
    </div>
  );
};

export default RepoCommits;
