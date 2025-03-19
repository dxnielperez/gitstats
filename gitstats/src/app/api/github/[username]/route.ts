/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  try {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const languagePromises = reposResponse.data.map((repo: any) =>
      axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/languages`,
        {
          headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        }
      )
    );
    const languageResponses = await Promise.all(languagePromises);
    const languages = languageResponses.reduce((acc: any, curr: any) => {
      for (const [lang, bytes] of Object.entries(curr.data)) {
        acc[lang] = (acc[lang] || 0) + (bytes as number);
      }
      return acc;
    }, {});

    return NextResponse.json({
      user: {
        login: userResponse.data.login,
        name: userResponse.data.name,
        bio: userResponse.data.bio,
        public_repos: userResponse.data.public_repos,
        followers: userResponse.data.followers,
        avatar_url: userResponse.data.avatar_url ?? "123",
        updated_at: userResponse.data.updated_at,
      },
      repos: reposResponse.data.map((repo: any) => ({
        name: repo.name,
        stargazers_count: repo.stargazers_count,
        watchers_count: repo.watchers_count,
        forks_count: repo.forks_count,
        html_url: repo.html_url,
      })),
      languages,
      all: {
        users: userResponse.data,
        repos: reposResponse.data,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "user not found or api error", error },
      { status: 404 }
    );
  }
}
