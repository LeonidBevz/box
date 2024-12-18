import React, { useState, useRef, useEffect } from 'react';
import './player.css';
import OpenSVG from './images/open';
import PauseSVG from './images/pause';
import PlaySVG from './images/play';

const VideoPlayer = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [videoTitle, setVideoTitle] = useState("Your Video Title");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoTitle(file.name);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (event) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime =
        (newProgress / 100) * videoRef.current.duration;
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return
    video.play()
    setIsPlaying(true)
    if (video) {
      video.addEventListener("timeupdate", updateProgress);
      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [videoSrc]);

  return (
    <div className="video-player-container">
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="video-player-video"
          onClick={togglePlayPause}
        />
      ) : (
        <div className="video-player-placeholder">Выберите видео</div>
      )}
      {videoSrc && <div className="video-player-title">{videoTitle}</div>}
      <div className="video-player-controls">
        <div className="video-player-file-input-container">
          <input
            type="file"
            accept="video/*"
            className="video-player-file-input"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <button onClick={()=>fileInputRef.current.click()} className="video-player-button">
            <OpenSVG/>
          </button>
          
        </div>
        <button onClick={togglePlayPause} className="video-player-button">
          {!isPlaying && <PlaySVG/>}
          {isPlaying && <PauseSVG/>}
        </button>
        { (
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          className="video-player-progress-slider"
        />
      )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="video-player-slider"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;