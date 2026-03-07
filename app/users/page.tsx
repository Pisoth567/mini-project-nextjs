import { User } from "@/lib/type/user";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {
  const res = await fetch("https://api.escuelajs.co/api/v1/users");
  const users: User[] = await res.json();

  const defaultAvatar = "https://www.computerhope.com/jargon/u/user.png";

  return (
    <div className="w-[80%] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">List of Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const avatar =
            user.avatar && user.avatar.startsWith("http")
              ? user.avatar
              : defaultAvatar;

          return (
            <Link 
              href={`/users/${user.id}`} 
              key={user.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  fill
                  src={avatar}
                  alt={`${user.name}'s avatar`} 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{user.name}</h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {user.email}
                  </p>

                  <p className="text-sm text-gray-400">
                    Member since:{" "}
                    {new Date(user.creationAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center text-gray-500">
        Total users: {users.length}
      </div>
    </div>
  );
}