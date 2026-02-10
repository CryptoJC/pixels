import React, { useState, useEffect, useRef } from 'react';

const RandomPixelFiller = () => {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pixelsFilled, setPixelsFilled] = useState(0);
  const [speed, setSpeed] = useState(100);
  const filledPixelsRef = useRef(new Set());
  const animationRef = useRef(null);
  const totalPixels = 1000 * 1000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    // Fill with white background initially
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 1000);
  }, []);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const fillRandomPixel = () => {
    if (filledPixelsRef.current.size >= totalPixels) {
      setIsRunning(false);
      return false;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let x, y, key;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Try to find an unfilled pixel
    do {
      x = Math.floor(Math.random() * 1000);
      y = Math.floor(Math.random() * 1000);
      key = `${x},${y}`;
      attempts++;
      
      // If we've tried too many times, scan for next available pixel
      if (attempts >= maxAttempts) {
        let found = false;
        for (let i = 0; i < 1000 && !found; i++) {
          for (let j = 0; j < 1000 && !found; j++) {
            const testKey = `${i},${j}`;
            if (!filledPixelsRef.current.has(testKey)) {
              x = i;
              y = j;
              key = testKey;
              found = true;
            }
          }
        }
        if (!found) return false;
        break;
      }
    } while (filledPixelsRef.current.has(key));
    
    // Fill the pixel with random color
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(x, y, 1, 1);
    
    filledPixelsRef.current.add(key);
    setPixelsFilled(filledPixelsRef.current.size);
    
    return true;
  };

  const animate = () => {
    if (!isRunning) return;
    
    // Fill multiple pixels per frame based on speed
    const pixelsPerFrame = Math.max(1, Math.floor(speed / 10));
    
    for (let i = 0; i < pixelsPerFrame; i++) {
      const shouldContinue = fillRandomPixel();
      if (!shouldContinue) {
        setIsRunning(false);
        return;
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    filledPixelsRef.current.clear();
    setPixelsFilled(0);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 1000);
  };

  const progress = ((pixelsFilled / totalPixels) * 100).toFixed(4);
  const isComplete = pixelsFilled >= totalPixels;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">
            Random Pixel Filler
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Watch as random pixels fill a 1000×1000 canvas
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-700">
                {pixelsFilled.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pixels Filled</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-700">
                {progress}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Canvas Container */}
          <div className="mb-6 flex justify-center">
            <div className="border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <canvas 
                ref={canvasRef} 
                width={1000} 
                height={1000}
                className="max-w-full h-auto"
                style={{ 
                  display: 'block',
                  imageRendering: 'pixelated'
                }}
              />
            </div>
          </div>

          {/* Speed Control */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Speed: {speed}x
            </label>
            <input
              type="range"
              min="1"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            {!isRunning && !isComplete && (
              <button
                onClick={handleStart}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
              >
                {pixelsFilled > 0 ? 'Resume' : 'Start'}
              </button>
            )}
            
            {isRunning && (
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
              >
                Pause
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
            >
              Reset
            </button>
          </div>

          {isComplete && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-xl text-center">
              <p className="text-xl font-bold text-green-700">
                🎉 All pixels filled! Canvas complete!
              </p>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>How it works:</strong> The app generates two random numbers (0-999) for X and Y coordinates, 
              then plots a pixel with a random RGB color at that location. It continues until all 
              1,000,000 pixels are filled. Use the speed slider to control how fast pixels are added!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPixelFiller;
