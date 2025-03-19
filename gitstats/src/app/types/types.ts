export interface ApiResponse {
  user: {
    login: string;
    name?: string;
    bio?: string;
    public_repos: number;
    followers: number;
    avatar_url: string;
  };
  repos: {
    name: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    watchers_count: number;
    description: string;
  }[];
  languages: { [key: string]: number };
}
