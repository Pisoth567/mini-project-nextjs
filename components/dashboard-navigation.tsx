"use client";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();

  const navigateToParallelRoute = (tab: string) => {
    router.push(`/dashboard?tab=${tab}`);
  };

  return (
    <nav>
      <button onClick={() => navigateToParallelRoute("create")}>
        Create
      </button>
      <button onClick={() => navigateToParallelRoute("delete")}>
        Delete
      </button>
      <button onClick={() => navigateToParallelRoute("update")}>
        Update
      </button>
      <button onClick={() => navigateToParallelRoute("view")}>
        View
      </button>
    </nav>
  );
}