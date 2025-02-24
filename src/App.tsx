import React, { useEffect, useState } from 'react';
import bgVideo from './assets/hyperman-bg.mp4';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [shake, setShake] = useState(false);

  useEffect(() => {
    const launchDate = new Date('2025-02-25T16:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      // Trigger shake animation every second
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getEarthquakeClass = (unit: string) => {
    if (!shake) return '';
    return `animate-earthquake-${unit.toLowerCase()}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className={`relative group ${getEarthquakeClass(unit)}`}>
          <div className="relative transform-gpu transition-all duration-500 group-hover:scale-105">
            {/* Glitch effect layers */}
            <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-lg transform-gpu scale-110 animate-glow" />
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg animate-glitch-1" />
            <div className="absolute inset-0 bg-emerald-600/10 rounded-lg animate-glitch-2" />
            
            {/* Main container */}
            <div className="relative bg-emerald-900/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg border border-emerald-500/30">
              {/* Number */}
              <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-400 animate-number-pulse text-center">
                {value.toString().padStart(2, '0')}
              </div>
              
              {/* Unit label */}
              <div className="text-emerald-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base uppercase tracking-wider font-light text-center">
                {unit}
              </div>
            </div>

            {/* Energy lines */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-emerald-400/50 animate-energy-pulse" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-emerald-400/50 animate-energy-pulse-delayed" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#001a1a]/80 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <CountdownTimer />
      </div>
    </div>
  );
}

export default App;