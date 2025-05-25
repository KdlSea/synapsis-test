import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/actions/sessions";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  return (
    <div className="flex flex-col h-dvh">
      {/* navbar */}
      <header className="h-[68px] w-full border-b border-gray-200 bg-white z-10">
        <Navbar props={session} />
      </header>

      {/* sidebar  */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <aside className="w-[288px] shrink-0 border-r border-gray-200 bg-white">
          <Sidebar />
        </aside>

        {/* main content */}
        <main className="flex-1 overflow-y-auto px-6 pt-6 pb-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
