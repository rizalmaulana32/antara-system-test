"use client";
import repositoryService from "@/services/repositoryService";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { Commit } from "@/types/types";
import useInfiniteScroll from "@/lib/useInfiniteScroll";
import CommitList from "@/components/features/commit/CommitList";

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
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Recent Commits for {repo}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <CommitList commits={commits} />
      {loading && <SkeletonLoader rows={2} />}
      {!hasMore && <p>No more commits available.</p>}
    </div>
  );
};

export default RepoCommits;
