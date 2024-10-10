"use client";
import CommitList from "@/components/features/commit/CommitList";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import repositoryService from "@/services/repositoryService";
import { Commit } from "@/types/types";

const RepoCommits = ({ params }: { params: { repo: string } }) => {
  const { repo } = params;

  const {
    data: commits,
    loading,
    error,
    hasMore,
  } = useInfiniteScroll<Commit>(async (page, perPage) => {
    return await repositoryService.getCommits("apache", repo, page, perPage);
  });

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Recent Commits for <span className="text-primary">{repo}</span>
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <CommitList commits={commits} />
      {loading && <SkeletonLoader rows={2} />}
      {!hasMore && (
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          No more commits available.
        </p>
      )}
    </div>
  );
};

export default RepoCommits;
