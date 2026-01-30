import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const AudioPlayer = forwardRef((_, ref) => {
  const audioRef = useRef(null);
  const src = `${import.meta.env.BASE_URL}songs/demons.mp3`;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audio = () => audioRef.current;

  const seek = (seconds) => {
    if (!audio()) return;
    audio().currentTime = Math.min(
      audio().duration,
      Math.max(0, audio().currentTime + seconds),
    );
  };

  useImperativeHandle(ref, () => ({
    back10: () => seek(-10),
    forward10: () => seek(10),
  }));

  const togglePlay = () => {
    if (!audio()) return;
    audio().paused ? audio().play() : audio().pause();
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = String(Math.floor(time % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!audio()) return;
    audio().pause();
    audio().currentTime = 0;
  }, [src]);

  return (
    <div className="audioplayer-songs">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => setCurrentTime(audio()?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audio()?.duration || 0)}
      />

      <div className="buttons-audio">
        <span className="material-symbols-outlined" onClick={() => seek(-10)}>
          replay_10
        </span>
        <span className="material-symbols-outlined" onClick={() => seek(10)}>
          forward_10
        </span>
        <span className="material-symbols-outlined" onClick={togglePlay}>
          {isPlaying ? <span>pause_circle</span> : <span>play_circle</span>}
        </span>
      </div>

      <div className="time-info">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
});

export default AudioPlayer;
