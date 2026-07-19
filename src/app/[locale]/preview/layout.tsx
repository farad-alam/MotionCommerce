import { ReactNode } from "react";
import { configService } from "@/server/services/config.service";

export default async function PreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  const themeConfig = await configService.getThemeConfig();

  const styles = themeConfig
    ? ((themeConfig.customStyles as Record<string, string>) ?? {})
    : {};

  const customStyle = themeConfig
    ? ({
        "--theme-primary": styles.primaryColor || "#4f46e5",
        "--theme-secondary": styles.secondaryColor || "#1e293b",
        "--theme-radius": styles.borderRadius || "0.5rem",
        "--theme-font": styles.fontFamily || "Inter",
      } as React.CSSProperties)
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground" style={customStyle}>
      {children}
    </div>
  );
}
