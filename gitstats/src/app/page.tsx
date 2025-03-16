"use client";
import { useState } from "react";
import { ProfileDisplay, Username } from "./components";

interface ProfileData {
  login: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  avatar_url: string;
}

interface RepoData {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

interface ApiResponse {
  user: ProfileData;
  repos: RepoData[];
  languages: { [key: string]: number };
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch(username: string) {
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/github/${username}`);
      if (!response.ok) throw new Error("User not found or API error");
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  }
  console.log("data", data);
  return (
    <div>
      <div className="w-min mx-auto">
        <Username onSubmitAction={handleFetch} />
        <ProfileDisplay data={data} error={error} />
      </div>
    </div>
  );
}
