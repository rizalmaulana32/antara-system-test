import Image from "next/image";
import { Commit } from "@/types/types";

interface CommitListProps {
  commits: Commit[];
}

const CommitList = ({ commits }: CommitListProps) => {
  if (commits.length === 0)
    return <p className="text-gray-500">No commits found.</p>;

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Commits
      </h2>
      <ul className="space-y-4">
        {commits.map((commit) => (
          <li
            key={commit.sha}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition border border-gray-200 dark:border-gray-600"
          >
            <p className="text-gray-800 dark:text-gray-200 truncate">
              <strong>Commit Message:</strong> {commit.commit.message}
            </p>
            <p className="text-gray-500 flex items-center gap-1">
              {commit?.committer?.avatar_url && (
                <Image
                  className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600"
                  src={commit?.committer.avatar_url}
                  alt={`${commit.commit.author.name}'s avatar`}
                  width={24}
                  height={24}
                />
              )}
              <strong className="text-gray-900 dark:text-gray-200">
                Author:
              </strong>{" "}
              {commit.commit.author.name}
            </p>
            <p className="text-gray-500">
              <strong>Date:</strong>{" "}
              {new Date(commit.commit.author.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitList;
