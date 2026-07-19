import { configService } from "@/server/services/config.service";
import { ConfigEditor } from "./ConfigEditor";

export default async function BuilderPage() {
  const siteConfig = await configService.getSiteConfig();
  const themeConfig = await configService.getThemeConfig();
  const featureFlags = await configService.getFeatureFlags();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to MotionBite Builder</h1>
      <p className="mt-4 text-slate-400 max-w-2xl">
        This is the "Configuration over coding" interface. Junior developers and agency staff can use this to configure the storefront without touching code.
      </p>
      
      <ConfigEditor 
        initialSiteConfig={siteConfig}
        initialThemeConfig={themeConfig}
        initialFeatureFlags={featureFlags}
      />
    </div>
  );
}
