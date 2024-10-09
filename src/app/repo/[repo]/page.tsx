"use client";
import { useState, useEffect } from "react";
import CommitList from "../../../components/CommitList";
import repositoryService from "@/services/repositoryService";

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
      const commits = await repositoryService.getCommits(
        "apache",
        repo as string
      );
      setError("");
      setCommits(commits);
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
      {error && <p className="text-red-500">{error}</p>}
      <CommitList commits={commits} loading={loading} />
    </div>
  );
};

export default RepoCommits;
