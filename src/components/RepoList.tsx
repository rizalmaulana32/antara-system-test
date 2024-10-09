import Link from "next/link";
import { FiStar } from "react-icons/fi";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
}

interface RepoListProps {
  repos: Repo[];
}

const RepoList = ({ repos }: RepoListProps) => {
  if (repos.length === 0) return <p>No repositories found.</p>;

  return (
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Repositories
      </h2>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition"
          >
            <Link href={`/repo/${repo.name}`}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-blue-600">
                  {repo.name}
                </span>
                <span className="text-gray-500 flex items-center space-x-1">
                  <FiStar /> <span>{repo.stargazers_count}</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
