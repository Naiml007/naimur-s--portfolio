"use client"; // Marking this component as client-side

import { useState, useEffect } from "react";

export default function Home() {
  const [entered, setEntered] = useState(false); // Track if user clicked to enter
  const [showContent, setShowContent] = useState(false); // Control content reveal
  const [videoReady, setVideoReady] = useState(false); // Track if video is cached
  const [audio, setAudio] = useState(null); // Initialize audio state as null
  const [volumeControlVisible, setVolumeControlVisible] = useState(false); // Volume control visibility
  const [volume, setVolume] = useState(1); // Audio volume (0.0 to 1.0)

  useEffect(() => {
    // Create Audio object with video file once the component mounts
    const audioObject = new Audio("/video.mp4");
    audioObject.volume = volume; // Set initial volume
    setAudio(audioObject);

    // Ensure video is loaded
    const videoElement = document.getElementById("background-video");
    if (videoElement) {
      videoElement.oncanplaythrough = handleVideoLoad;
    }

    // Clean up audio object when component unmounts
    return () => {
      if (audioObject) {
        audioObject.pause();
        audioObject.src = ""; // Clear the audio source to free up memory
      }
    };
  }, []); // Run only once when the component mounts

  // Function to handle the click event, play audio/video, and reveal content
  const handleEnterClick = async () => {
    setEntered(true);
    
    // Request audio playback permissions and play the audio from the video
    if (audio) {
      try {
        await audio.play();
        console.log("Audio playback permitted");
      } catch (error) {
        console.error("Audio playback permission denied", error);
      }
    }

    // Delay the content reveal by 5 seconds
    setTimeout(() => setShowContent(true), 5000);

    // Play background video
    const videoElement = document.getElementById("background-video");
    if (videoElement) {
      videoElement.play();
    }
  };

  // Function to handle when video is ready (loaded)
  const handleVideoLoad = () => {
    setVideoReady(true);
  };

  // Toggle volume control visibility with Ctrl + V
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'v') {
      setVolumeControlVisible((prev) => !prev); // Toggle visibility
    }
  };

  // Update volume
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume; // Update audio volume
    }
  };

  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative">
      {/* Initial click to enter screen */}
      {!entered && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-2xl cursor-pointer"
          onClick={handleEnterClick}
        >
          <div className="text-center">
            <p className="animate-pulse">
              {videoReady ? "Click to Enter" : "Loading video..."}
            </p>
            <p className="text-gray-400 mt-2">Click here to enter</p>
            <p className="text-gray-400 mt-2">Use Ctrl + V to control volume</p> {/* Added description */}
          </div>
        </div>
      )}

      {/* After clicking, the content will reveal after 5 seconds */}
      {entered && (
        <div
          className={`transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          } flex flex-col items-center justify-center text-center`}
        >
          {/* Background Image or Color */}
          <div className="absolute inset-0 bg-gray-900"></div>

          {/* Portfolio Box with Border and 70% opacity */}
          <div
            className="z-10 p-8 rounded-lg shadow-lg max-w-md w-full"
            style={{ backgroundColor: "rgba(31, 41, 55, 0.7)" }} // Set background color with 70% opacity
          >
            <h1 className="text-5xl font-bold text-white mb-4">Ichigo</h1>
            <p className="text-xl text-gray-400 mb-6">bla bla hshfsdkfsdkf sd sfsd sd fsdfsdfjsdk fsd sdf sfjsdk fjs </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 justify-center">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/discord.svg" alt="Discord" className="w-8 h-8" />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/spotify.svg" alt="Spotify" className="w-8 h-8" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                <img src="/icons/telegram.svg" alt="Telegram" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Local video (background) with blur effect */}
          <video
            id="background-video"
            className="absolute inset-0 w-full h-full object-cover blur-lg"  // Apply blur here
            src="/video.mp4"
            preload="auto"
            loop
            muted
            playsInline
          />

          {/* Volume Control */}
          {volumeControlVisible && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-64 accent-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
