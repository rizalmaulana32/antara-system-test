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
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<string>("created");
  const [direction, setDirection] = useState<string>("asc");

  const {
    data: repos,
    loading,
    error,
    hasMore,
    setPage,
    setData,
    setHasMore,
  } = useInfiniteScroll(async (page, perPage) => {
    return await repositoryService.getRepositories(
      orgName,
      page,
      perPage,
      type,
      sort,
      direction
    );
  });

  const handleOrgNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        GitHub Projects Browser
      </h1>

      <div className="w-full max-w-lg flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
        <input
          type="text"
          value={orgName}
          onChange={handleOrgNameChange}
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter GitHub organization name"
        />
        <select
          value={type}
          onChange={handleTypeChange}
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white"
        >
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="forks">Forks</option>
          <option value="sources">Sources</option>
          <option value="member">Member</option>
        </select>
      </div>

      <div className="w-full max-w-lg flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row mt-4">
        <select
          value={sort}
          onChange={handleSortChange}
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white"
        >
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="pushed">Pushed</option>
          <option value="full_name">Full Name</option>
        </select>

        <select
          value={direction}
          onChange={handleDirectionChange}
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
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
