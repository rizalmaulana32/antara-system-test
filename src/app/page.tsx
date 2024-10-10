"use client";
import { FiSearch } from "react-icons/fi";
import repositoryService from "@/services/repositoryService";
import { useState } from "react";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import RepoList from "@/components/features/repo/RepoList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
    <div className="min-h-screen flex flex-col items-center py-10">
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
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center"
        >
          <FiSearch className="mr-2" /> Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <RepoList repos={repos} />
      {loading && <LoadingSpinner />}
      {!hasMore && <p>No more repositories available.</p>}
    </div>
  );
};

export default Home;
