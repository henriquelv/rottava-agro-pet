'use client'

import React from 'react'

interface WavyBackgroundProps {
  children: React.ReactNode
}

export function WavyBackground({ children }: WavyBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#90C290]">
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 transform rotate-180">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 