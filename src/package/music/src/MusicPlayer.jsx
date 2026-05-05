import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "../css/music.css";

const TRACKS = [
  {
    id: 1,
    title: "Dub Invaders",
    artist: "Zentone",
    genre: "Dub / Electronic",
    color: "#FED73C",
    src: "/son/SpotiDownloader.com - Dub Invaders - Tone-mix - Zentone.mp3",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80",
  },
];

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function MusicPlayer({ isOpen, onClose }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [bars, setBars] = useState(new Array(64).fill(0));
  const [needleActive, setNeedleActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  const track = TRACKS[trackIndex];

  // Ouverture / fermeture GSAP
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(panelRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.55, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, {
        y: "100%", duration: 0.4, ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => setMounted(false),
      });
    }
  }, [isOpen, mounted]);

  // Web Audio API
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    sourceRef.current = source;
  }, []);

  // Visualizer loop
  const animate = useCallback(() => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      setBars(Array.from(data));
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setTrackIndex((i) => (i + 1) % TRACKS.length);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    audio.load();
    setProgress(0);
    setCurrentTime(0);
    if (isPlaying) audio.play().catch(() => {});
  }, [trackIndex]);

  const togglePlay = () => {
    initAudio();
    if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
    if (isPlaying) {
      audioRef.current.pause();
      setNeedleActive(false);
    } else {
      audioRef.current.play().catch(() => {});
      setNeedleActive(true);
    }
    setIsPlaying((p) => !p);
  };

  const selectTrack = (i) => {
    if (i === trackIndex) { togglePlay(); return; }
    setIsPlaying(false);
    setNeedleActive(false);
    audioRef.current?.pause();
    setTrackIndex(i);
    setTimeout(() => {
      initAudio();
      if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
      setNeedleActive(true);
    }, 80);
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * (audioRef.current?.duration || 0);
    setProgress(ratio * 100);
  };

  const changeVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const prev = () => setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  const next = () => setTrackIndex((i) => (i + 1) % TRACKS.length);

  const vizBars = bars.slice(0, 48);
  const cx = 200, cy = 200, vizRadius = 160;

  if (!mounted) return <audio ref={audioRef} preload="metadata" />;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      {/* Overlay sombre */}
      <div ref={overlayRef} className="mp_overlay" onClick={onClose} />

      {/* Panel principal */}
      <div ref={panelRef} className="mp_panel" style={{ "--track-color": track.color }}>

        {/* Bouton fermeture */}
        <button className="mp_close" onClick={onClose} aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="mp_inner">
          {/* ─── LEFT ─── */}
          <div className="mp_left">
            <div className="mp_vinyl_wrap">
              {/* Visualiseur circulaire */}
              <svg className="mp_visualizer" viewBox="0 0 400 400">
                {vizBars.map((val, i) => {
                  const angle = (i / vizBars.length) * Math.PI * 2 - Math.PI / 2;
                  const norm = val / 255;
                  const x1 = cx + Math.cos(angle) * vizRadius;
                  const y1 = cy + Math.sin(angle) * vizRadius;
                  const x2 = cx + Math.cos(angle) * (vizRadius + 6 + norm * 55);
                  const y2 = cy + Math.sin(angle) * (vizRadius + 6 + norm * 55);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={track.color} strokeWidth="2.5" strokeLinecap="round"
                      opacity={0.3 + norm * 0.7}
                    />
                  );
                })}
              </svg>

              {/* Disque */}
              <div className={`mp_disk ${isPlaying ? "spinning" : ""}`}>
                <div className="mp_disk_grooves">
                  {[88, 76, 64, 52, 40].map((s) => (
                    <div key={s} className="mp_groove" style={{ width: `${s}%`, height: `${s}%` }} />
                  ))}
                </div>
                <div className="mp_cover" style={{ backgroundImage: `url(${track.cover})` }} />
                <div className="mp_center_hole" />
              </div>

              {/* Aiguille */}
              <div className={`mp_needle_wrap ${needleActive ? "active" : ""}`}>
                <div className="mp_needle" />
                <div className="mp_needle_head" />
              </div>
            </div>

            <div className="mp_track_info">
              <span className="mp_genre" style={{ color: track.color }}>{track.genre}</span>
              <h2 className="mp_title">{track.title}</h2>
              <p className="mp_artist">{track.artist}</p>
            </div>

            <div className="mp_progress_wrap">
              <span className="mp_time">{formatTime(currentTime)}</span>
              <div className="mp_progress" onClick={seek}>
                <div className="mp_progress_fill" style={{ width: `${progress}%`, background: track.color }} />
                <div className="mp_progress_thumb" style={{ left: `${progress}%`, background: track.color }} />
              </div>
              <span className="mp_time">{formatTime(duration)}</span>
            </div>

            <div className="mp_controls">
              <button className="mp_btn_icon" onClick={prev}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/></svg>
              </button>
              <button className="mp_btn_play" onClick={togglePlay} style={{ "--c": track.color }}>
                {isPlaying
                  ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                }
              </button>
              <button className="mp_btn_icon" onClick={next}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"/></svg>
              </button>
            </div>

            <div className="mp_volume_wrap">
              <svg className="mp_vol_icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <input type="range" min="0" max="1" step="0.01"
                value={volume} onChange={changeVolume}
                className="mp_volume" style={{ "--c": track.color }}
              />
            </div>
          </div>

          {/* ─── RIGHT: Playlist ─── */}
          <div className="mp_right">
            <h3 className="mp_playlist_title">Playlist</h3>
            <div className="mp_tracklist">
              {TRACKS.map((t, i) => (
                <button key={t.id}
                  className={`mp_track_card ${i === trackIndex ? "active" : ""}`}
                  onClick={() => selectTrack(i)}
                  style={{ "--c": t.color }}
                >
                  <div className="mp_card_cover" style={{ backgroundImage: `url(${t.cover})` }}>
                    <div className="mp_card_play_icon">
                      {i === trackIndex && isPlaying
                        ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      }
                    </div>
                    {i === trackIndex && isPlaying && (
                      <div className="mp_card_bars"><span /><span /><span /><span /></div>
                    )}
                  </div>
                  <div className="mp_card_info">
                    <span className="mp_card_num" style={{ color: t.color }}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="mp_card_title">{t.title}</p>
                      <p className="mp_card_artist">{t.artist}</p>
                    </div>
                    <span className="mp_card_genre">{t.genre}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
