import Link from "next/link";

export function Nav() {
  return (
    <nav className="bg-davy-gray text-tea-green p-5 flex items-end w-full">
      <ul className="flex justify-between w-full">
        <li>
          <Link href="/" className="text-5xl font-bubble font-extrabold">
            GitStats
          </Link>
        </li>

        <li className="flex items-end">
          <Link
            href="https://github.com/dxnielperez/gitstats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-medium"
          >
            Github
          </Link>
        </li>
      </ul>
    </nav>
  );
}
