"use client";
import { useState } from "react";
import { ProfileDisplay, Username } from "./components";
import { ApiResponse } from "./types";

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
      <div className="max-w-5xl w-full mx-auto flex flex-col px-4 mb-20">
        <Username onSubmitAction={handleFetch} />
        <ProfileDisplay data={data} error={error} />
      </div>
    </div>
  );
}
