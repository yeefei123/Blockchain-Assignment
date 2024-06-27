import Link from "next/link";

export function Navbar() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between ml-5">
        <ul className="flex space-x-10 text-white">
          <li>
            <Link href="/">Homepage</Link>
          </li>
          <li>
            <Link href="/about">Campaign List</Link>
          </li>
          <li>
            <Link href="/blog/hello-world">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
