"use client";

import Image from "next/image";
import Link from "next/link";
import { ApiResponse } from "../types";
import { FaEye } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { useState } from "react";
import { LanguagesChart } from "./LanguagesChart";

export function ProfileDisplay({
  data,
  error,
}: {
  data: ApiResponse | null;
  error: string | null;
}) {
  const filteredRepos = data?.repos || [];
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  const paginatedItems = filteredRepos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) return <p className="text-red-500 mt-2">{error}</p>;
  if (!data) return null;
  console.log("data", data);
  return (
    <div className="mt-4 text-white w-full mx-auto">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl">{data.user.name || data.user.login}</h2>
        <Image
          src={data.user.avatar_url}
          alt="pfp"
          width={200}
          height={200}
          className="rounded-xl"
        />
        <p>{data.user.bio || "No bio available"}</p>
        <p>Public Repos: {data.user.public_repos}</p>
        <p>Followers: {data.user.followers}</p>
      </div>

      <div className="flex flex-col mt-6">
        <p className="text-lg font-semibold">Repositories:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-h-[2s00px] h-full">
          {paginatedItems.map((repo) => (
            <Link
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col w-full max-h-32 h-full border border-white p-4 rounded-lg text-center hover:bg-white hover:text-black transition">
                <p className="font-semibold">{repo.name}</p>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {repo.description || "No description available"}
                </p>

                <div className="w-full flex justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <FaEye />
                    <span>{repo.watchers_count}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoMdStar />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <div>
        <LanguagesChart languages={data.languages} />
      </div>
    </div>
  );
}
