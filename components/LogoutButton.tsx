// components/LogoutButton.tsx
"use server";

import { signOut } from "@/lib/actions/auth";
import { redirect} from "next/navigation";

export const LogoutButton = async () => {
  async function handleLogout() {
    await signOut();
    redirect("/log-in");
  }

  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className="text-left w-full px-4 py-2 hover:bg-gray-100"
      >
        Log-Out
      </button>
    </form>
  );
};
