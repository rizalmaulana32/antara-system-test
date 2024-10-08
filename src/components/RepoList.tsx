import Link from "next/link";

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
    <div>
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link href={`/${repo.name}`}>
              {repo.name} - ⭐ {repo.stargazers_count}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
