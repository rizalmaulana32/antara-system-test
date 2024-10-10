import Image from "next/image";
import { Commit } from "@/types/types";

interface CommitListProps {
  commits: Commit[];
}

const CommitList = ({ commits }: CommitListProps) => {
  if (commits.length === 0) return <p>No commits found.</p>;

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Commits
      </h2>
      <ul className="space-y-4">
        {commits.map((commit) => (
          <li
            key={commit.sha}
            className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition"
          >
            <p className="text-gray-800 truncate">
              <strong>Commit Message:</strong> {commit.commit.message}
            </p>
            <p className="text-gray-500 flex items-center gap-1">
              {commit?.committer?.avatar_url && (
                <Image
                  className="w-[20px] h-[20px] rounded-full bg-white"
                  src={commit?.committer.avatar_url}
                  alt={`${commit.commit.author.name}'s avatar`}
                  width={20}
                  height={20}
                />
              )}
              <strong>Author:</strong> {commit.commit.author.name}
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
