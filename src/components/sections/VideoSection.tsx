export function VideoSection({ settings }: { settings: any }) {
  const title = settings.title || "";
  const subtitle = settings.subtitle || "";
  const videoUrl = settings.videoUrl || "";
  const autoplay = settings.autoplay ?? false;
  const muted = settings.muted ?? true;
  const variant = settings.variant || "default";

  // Detect YouTube/Vimeo vs. direct video
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const isVimeo = videoUrl.includes("vimeo.com");

  const getEmbedUrl = () => {
    if (isYouTube) {
      const id = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${id}?${autoplay ? "autoplay=1&" : ""}mute=${muted ? 1 : 0}&rel=0`;
    }
    if (isVimeo) {
      const id = videoUrl.split("/").pop();
      return `https://player.vimeo.com/video/${id}?${autoplay ? "autoplay=1&" : ""}muted=${muted ? 1 : 0}`;
    }
    return "";
  };

  if (variant === "fullscreen") {
    return (
      <section className="w-full h-[80vh] min-h-[500px] relative bg-black overflow-hidden group">
        {!videoUrl ? (
          <div className="w-full h-full flex items-center justify-center text-white/50 bg-secondary">
            Add a video URL in the builder settings
          </div>
        ) : isYouTube || isVimeo ? (
          <iframe
            src={getEmbedUrl()}
            className="w-[300vw] h-[300vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={videoUrl}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
            autoPlay={autoplay}
            muted={muted}
            loop={settings.loop ?? false}
            playsInline
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-16 lg:p-24 z-10 pointer-events-none">
          {title && <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">{title}</h2>}
          {subtitle && <p className="text-xl sm:text-2xl text-white/90 max-w-2xl drop-shadow-md">{subtitle}</p>}
        </div>
      </section>
    );
  }

  // Default Variant
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold text-foreground mb-3">{title}</h2>}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        <div className="rounded-[var(--theme-radius)] overflow-hidden aspect-video bg-secondary border border-border shadow-xl relative group">
          {!videoUrl ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Add a video URL in the builder settings
            </div>
          ) : isYouTube || isVimeo ? (
            <iframe
              src={getEmbedUrl()}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              autoPlay={autoplay}
              muted={muted}
              loop={settings.loop ?? false}
              playsInline
            />
          )}
        </div>
      </div>
    </section>
  );
}
