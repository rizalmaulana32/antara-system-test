import React from "react";

interface RepoSkeletonLoaderProps {
  rows: number;
}

const RepoSkeletonLoader: React.FC<RepoSkeletonLoaderProps> = ({ rows }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-gray-200 rounded-md animate-pulse min-w-[500px] cursor-default"
        >
          <div className="w-24 h-24 bg-gray-300 rounded-lg mb-2" />
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};

export default RepoSkeletonLoader;
