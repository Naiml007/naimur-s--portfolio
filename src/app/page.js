'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [audio, setAudio] = useState(null)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audioObject = new Audio('/video.mp4')
    audioObject.volume = volume
    setAudio(audioObject)

    const videoElement = document.getElementById('background-video')
    if (videoElement) {
      videoElement.oncanplaythrough = () => setVideoReady(true)
    }

    return () => {
      if (audioObject) {
        audioObject.pause()
        audioObject.src = ''
      }
    }
  }, [])

  const handleEnterClick = useCallback(async () => {
    setEntered(true)
    
    if (audio) {
      try {
        await audio.play()
        console.log('Audio playback permitted')
      } catch (error) {
        console.error('Audio playback permission denied', error)
      }
    }

    setTimeout(() => setShowContent(true), 5000)

    const videoElement = document.getElementById('background-video')
    if (videoElement) {
      videoElement.play()
    }
  }, [audio])

  const handleVolumeChange = useCallback((value) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audio) {
      audio.volume = newVolume
    }
  }, [audio])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative">
      {!entered && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white text-2xl cursor-pointer"
          onClick={handleEnterClick}
        >
          <div className="text-center">
            <p className="animate-pulse mb-4">
              {videoReady ? 'Click to Enter' : 'Loading video...'}
            </p>
            <Button onClick={handleEnterClick} disabled={!videoReady}>
              Enter Portfolio
            </Button>
            <p className="text-gray-400 mt-2">Use Ctrl + V to control volume</p>
          </div>
        </div>
      )}

      {entered && (
        <div
          className={`transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          } flex flex-col items-center justify-center text-center`}
        >
          <div className="absolute inset-0 bg-gray-900"></div>

          <div
            className="z-10 p-8 rounded-lg shadow-lg max-w-md w-full bg-gray-800 bg-opacity-70"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Ichigo</h1>
            <p className="text-xl text-gray-300 mb-6">Web developer passionate about creating immersive digital experiences</p>

            <div className="flex space-x-4 justify-center">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12s12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24c-2.82-1.74-6.36-2.101-10.561-1.141c-.418.122-.779-.179-.899-.539c-.12-.421.18-.78.54-.9c4.56-1.021 8.52-.6 11.64 1.32c.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3c-3.239-1.98-8.159-2.58-11.939-1.38c-.479.12-1.02-.12-1.14-.6c-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721c-.18-.601.18-1.2.72-1.381c4.26-1.26 11.28-1.02 15.721 1.621c.539.3.719 1.02.419 1.56c-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zM16.9 7.05c.156.066.266.176.314.314c.05.138.066.28.05.422a.7.7 0 0 1-.024.137l-1.56 7.8a1.013 1.013 0 0 1-.686.813a.97.97 0 0 1-.89-.18l-2.544-1.91l-1.376 1.376a.483.483 0 0 1-.352.142a.495.495 0 0 1-.352-.142a.5.5 0 0 1-.142-.352v-2.707l4.933-4.433c.204-.186.228-.468.05-.686a.493.493 0 0 0-.686-.05l-6.053 3.8l-2.603-.85a.981.981 0 0 1-.53-.53a.973.973 0 0 1-.05-.715a.983.983 0 0 1 .51-.61l10.26-4.12a.983.983 0 0 1 .715-.05z" />
                </svg>
              </a>
            </div>
          </div>

          <video
            id="background-video"
            className="absolute inset-0 w-full h-full object-cover blur-sm"
            src="/video.mp4"
            preload="auto"
            loop
            muted
            playsInline
          />

          {entered && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-64 bg-white p-2 rounded-full">
              <Slider
                defaultValue={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="[&_[role=slider]]:bg-gray-900 [&_[role=slider]]:border-gray-900 [&_[role=slider]]:focus:ring-gray-900 [&>.bg-primary]:bg-gray-300"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}