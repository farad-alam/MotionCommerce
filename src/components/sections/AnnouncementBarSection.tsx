export function AnnouncementBarSection({ settings }: { settings: any }) {
  if (!settings.text) return null;

  const bgColor = settings.bgColor || "#4f46e5";
  const textColor = settings.textColor || "#ffffff";

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="w-full py-2.5 px-4 text-center text-sm font-medium relative"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        {settings.emoji && <span>{settings.emoji}</span>}
        <span>{settings.text}</span>
        {settings.linkText && settings.linkUrl && (
          <a
            href={settings.linkUrl}
            className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity ml-2"
          >
            {settings.linkText} →
          </a>
        )}
      </div>
    </div>
  );
}
