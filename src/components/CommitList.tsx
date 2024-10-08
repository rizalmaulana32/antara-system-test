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
    <div>
      <h2>Recent Commits</h2>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>
            <p>{commit.commit.message}</p>
            <p>
              <strong>Author:</strong> {commit.commit.author.name}
            </p>
            <p>
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
