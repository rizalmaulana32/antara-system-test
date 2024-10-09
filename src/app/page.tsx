"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import repositoryService from "@/services/repositoryService";
import RepoList from "@/components/RepoList";
import Pagination from "@/components/Pagination";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
}

const Home = () => {
  const [orgName, setOrgName] = useState<string>("apache");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchRepos = async () => {
    setLoading(true);
    setError("");
    try {
      const repos = await repositoryService.getRepositories(
        orgName,
        page,
        perPage
      );
      setRepos(repos);
      setTotalPages(5);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch repositories.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRepos();
  }, [orgName, page]);

  const handleOrgNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        GitHub Projects Browser
      </h1>
      <div className="w-full max-w-lg flex items-center space-x-3 mb-6">
        <input
          type="text"
          value={orgName}
          onChange={handleOrgNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter GitHub organization name"
        />
        <button
          onClick={fetchRepos}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center"
        >
          <FiSearch className="mr-2" /> Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <RepoList repos={repos} loading={loading} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
