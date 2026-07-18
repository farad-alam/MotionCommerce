import { auth } from "@/lib/auth";

export async function DashboardHeader() {
  const session = await auth();
  
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="font-medium text-slate-800">
        Dashboard
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          Logged in as <span className="font-semibold text-slate-800">{session?.user?.name || session?.user?.email}</span>
        </span>
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
          {session?.user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
}
