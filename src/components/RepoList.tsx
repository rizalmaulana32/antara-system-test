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
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Repositories
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Repository Name
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Stars
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id} className="hover:bg-gray-100 transition">
              <td className="py-3 px-4 border-b">
                <span className="text-blue-600 font-medium">{repo.name}</span>
              </td>
              <td className="py-3 px-4 border-b text-gray-500 flex items-center space-x-1">
                <FiStar /> <span>{repo.stargazers_count}</span>
              </td>
              <td className="py-3 px-4 border-b">
                <Link
                  href={`/repo/${repo.name}`}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepoList;
