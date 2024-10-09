import React from "react";

interface SkeletonLoaderProps {
  rows: number;
}

const SkeletonLoader = ({ rows }: SkeletonLoaderProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-5 w-96"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
