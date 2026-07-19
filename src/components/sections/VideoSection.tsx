export function VideoSection({ settings }: { settings: any }) {
  const title = settings.title || "";
  const subtitle = settings.subtitle || "";
  const videoUrl = settings.videoUrl || "";
  const autoplay = settings.autoplay ?? false;
  const muted = settings.muted ?? true;

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

  return (
    <section className="w-full py-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>}
            {subtitle && <p className="text-slate-400">{subtitle}</p>}
          </div>
        )}

        <div className="rounded-3xl overflow-hidden aspect-video bg-slate-800 shadow-2xl">
          {!videoUrl ? (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
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
