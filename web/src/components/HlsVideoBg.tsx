import { useEffect, useRef } from "react";

const HLS_SRC =
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

type Props = {
  className?: string;
  src?: string;
};

/**
 * Full-bleed HLS video, meant to sit behind hero content.
 * hls.js is loaded lazily so it never lands in the main bundle;
 * Safari plays the .m3u8 natively.
 */
const HlsVideoBg = ({ className, src = HLS_SRC }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let destroyed = false;
    let hls: { destroy: () => void } | null = null;

    import("hls.js").then(({ default: Hls }) => {
      if (destroyed) return;
      if (Hls.isSupported()) {
        const instance = new Hls();
        hls = instance;
        instance.loadSource(src);
        instance.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    });

    return () => {
      destroyed = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
};

export default HlsVideoBg;
