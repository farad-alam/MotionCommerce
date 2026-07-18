import { ReactNode } from "react";

export default function BuilderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-50">
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
        <div className="flex items-center gap-2">
          <div className="font-bold text-indigo-400">MotionBite Builder</div>
          <div className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">v1.0.0</div>
        </div>
        <nav className="flex gap-4 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white">Store Config</a>
          <a href="#" className="hover:text-white">Theme Editor</a>
          <a href="#" className="hover:text-white">Layouts</a>
        </nav>
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
