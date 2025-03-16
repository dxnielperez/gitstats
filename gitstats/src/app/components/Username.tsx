"use client";
import { useState } from "react";

export function Username({
  onSubmitAction,
}: {
  onSubmitAction: (username: string) => void;
}) {
  const [username, setUsername] = useState<string>("");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitAction(username);
  }

  return (
    <form className="p-2" onSubmit={handleSubmit}>
      <label htmlFor="username" className="text-white">
        Username:
      </label>
      <br />
      <input
        className="bg-white p-1 rounded"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleOnChange}
      />
      <br />
      <button
        type="submit"
        className="mt-2 p-1 bg-[#ff8811] text-black rounded w-full cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
