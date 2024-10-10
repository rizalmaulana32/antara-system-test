"use client";
import { FiSearch } from "react-icons/fi";
import repositoryService from "@/services/repositoryService";
import { useState } from "react";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import RepoList from "@/components/features/repo/RepoList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

const Home = () => {
  const [orgName, setOrgName] = useState<string>("apache");

  const {
    data: repos,
    loading,
    error,
    hasMore,
    setPage,
    setData,
    setHasMore,
  } = useInfiniteScroll(async (page, perPage) => {
    return await repositoryService.getRepositories(orgName, page, perPage);
  });

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        GitHub Projects Browser
      </h1>
      <div className="w-full max-w-lg flex items-center space-x-3">
        <input
          type="text"
          value={orgName}
          onChange={handleOrgNameChange}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter GitHub organization name"
        />
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          <FiSearch className="mr-2" /> <span>Search</span>
        </button>
      </div>
      <div className="my-6">
        <DarkModeToggle />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <RepoList repos={repos} />
      {loading && <LoadingSpinner />}
      {!hasMore && (
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          No more repositories available.
        </p>
      )}
    </div>
  );
};

export default Home;
