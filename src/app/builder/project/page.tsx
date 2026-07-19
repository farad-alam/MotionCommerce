import { configService } from "@/server/services/config.service";
import { format } from "date-fns";
import { Server, ShieldCheck, GitBranch } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BuilderProjectPage() {
  const meta = await configService.getPlatformMeta();

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center gap-3 mb-8">
        <Server className="w-8 h-8 text-indigo-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Project Overview</h1>
          <p className="text-sm text-slate-400">System information and versioning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Version Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">System Versions</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Platform Engine</p>
              <div className="flex items-center justify-between bg-slate-900 rounded p-3 border border-slate-700">
                <span className="font-medium text-white">{meta?.platformName || "MotionBite Engine"}</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                  v{meta?.platformVersion || "1.0.0"}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Instance Codebase</p>
              <div className="flex items-center justify-between bg-slate-900 rounded p-3 border border-slate-700">
                <span className="font-medium text-white">Current Branch</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  v{meta?.codebaseVersion || "1.0.0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Instance History</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Cloned At</p>
              <p className="font-medium text-white">
                {meta?.clonedAt ? format(new Date(meta.clonedAt), "MMMM d, yyyy h:mm a") : "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Last Updated</p>
              <p className="font-medium text-white">
                {meta?.lastUpdatedAt ? format(new Date(meta.lastUpdatedAt), "MMMM d, yyyy h:mm a") : "Unknown"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
