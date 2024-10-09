import Link from "next/link";
import { FiStar } from "react-icons/fi";
import SkeletonLoader from "./SkeletonLoader";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
}

interface RepoListProps {
  repos: Repo[];
  loading: boolean;
}

const RepoList = ({ repos, loading }: RepoListProps) => {
  if (loading) {
    return <SkeletonLoader rows={5} />;
  }
  if (repos.length === 0) return <p>No repositories found.</p>;

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Repositories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <Link href={`/repo/${repo.name}`} key={repo.id}>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition cursor-pointer">
              <div className="w-24 h-24 flex items-center justify-center bg-blue-500 text-white text-4xl font-bold rounded-lg mb-2">
                {repo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-lg font-medium text-blue-600 mb-1">
                {repo.name}
              </span>
              <span className="text-gray-500 flex items-center space-x-1">
                <FiStar /> <span>{repo.stargazers_count}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
