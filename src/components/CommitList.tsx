interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface CommitListProps {
  commits: Commit[];
}

const CommitList = ({ commits }: CommitListProps) => {
  if (commits.length === 0) return <p>No commits found.</p>;

  return (
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Commits
      </h2>
      <ul className="space-y-4">
        {commits.map((commit) => (
          <li
            key={commit.sha}
            className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition"
          >
            <p className="text-gray-800">{commit.commit.message}</p>
            <p className="text-gray-500">
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
