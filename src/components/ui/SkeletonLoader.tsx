import React from "react";

interface SkeletonLoaderProps {
  rows: number;
}

const SkeletonLoader = ({ rows }: SkeletonLoaderProps) => {
  return (
    <div className="space-y-4 w-full mt-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse flex flex-col space-y-2">
          <div className="rounded-full bg-gray-300 h-5 w-full"></div>
          <div className="rounded bg-gray-300 h-4 w-full"></div>
          <div className="rounded bg-gray-300 h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
