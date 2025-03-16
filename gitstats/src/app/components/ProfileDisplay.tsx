import Image from "next/image";

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

export function ProfileDisplay({
  data,
  error,
}: {
  data: ApiResponse | null;
  error: string | null;
}) {
  if (error) return <p className="text-red-500 mt-2">{error}</p>;
  if (!data) return null;

  return (
    <div className="mt-4 text-white">
      <h2 className="text-2xl">{data.user.name || data.user.login}</h2>
      <Image src={data.user.avatar_url} alt="pfp" width={150} height={150} />
      <p>{data.user.bio || "No bio available"}</p>
      <p>Public Repos: {data.user.public_repos}</p>
      <p>Followers: {data.user.followers}</p>
    </div>
  );
}
