"use client";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <div className="relative">
        <div
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isDarkMode ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
      <span className="ml-3 text-gray-700 dark:text-gray-300">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </label>
  );
};

export default DarkModeToggle;
