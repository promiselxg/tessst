import { Book, Home, Trophy, Users2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: "noindex, nofollow",
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          This page doesn’t exist
        </h1>
        <p className="text-gray-600 mb-6">
          The resources section must be accessed via a specific topic like News,
          Training, or Competition.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/"
            className="text-blue-600 hover:underline font-medium flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link
            href="/resources/news"
            className="text-blue-600 hover:underline font-medium flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            News
          </Link>
          <Link
            href="/resources/training"
            className="text-blue-600 hover:underline font-medium flex items-center gap-2"
          >
            <Users2 className="w-5 h-5" />
            Training
          </Link>
          <Link
            href="/resources/competition"
            className="text-blue-600 hover:underline font-medium flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Competition
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
