import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Settings, X } from 'lucide-react';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState({
    particleCount: 100,
    particleSize: 3,
    particleSpeed: 1,
    connectionDistance: 150,
    mouseRadius: 200,
    colorScheme: 'blue',
    enableConnections: true,
    enableMouse: true
  });

  const colorSchemes = {
    blue: { particles: '#3b82f6', connections: 'rgba(59, 130, 246, 0.2)' },
    purple: { particles: '#a855f7', connections: 'rgba(168, 85, 247, 0.2)' },
    green: { particles: '#10b981', connections: 'rgba(16, 185, 129, 0.2)' },
    red: { particles: '#ef4444', connections: 'rgba(239, 68, 68, 0.2)' },
    rainbow: { particles: 'rainbow', connections: 'rgba(255, 255, 255, 0.2)' },
    white: { particles: '#ffffff', connections: 'rgba(255, 255, 255, 0.2)' }
  };

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.particleSpeed;
      this.vy = (Math.random() - 0.5) * config.particleSpeed;
      this.size = config.particleSize;
      this.hue = Math.random() * 360;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

      // Keep particles in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));

      // Mouse interaction
      if (config.enableMouse && mouseRef.current.x !== null) {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.5;
          this.vy -= Math.sin(angle) * force * 0.5;
        }
      }

      // Speed limit
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const maxSpeed = config.particleSpeed * 2;
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      if (colorSchemes[config.colorScheme].particles === 'rainbow') {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        this.hue = (this.hue + 1) % 360;
      } else {
        ctx.fillStyle = colorSchemes[config.colorScheme].particles;
      }
      
      ctx.fill();
    }
  }

  // Initialize particles
  const initParticles = (canvas) => {
    particlesRef.current = [];
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }
  };

  // Draw connections
  const drawConnections = (ctx) => {
    if (!config.enableConnections) return;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = colorSchemes[config.colorScheme].connections;
          ctx.lineWidth = 1 - distance / config.connectionDistance;
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
        }
      }
    }
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    drawConnections(ctx);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });

    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = null;
    mouseRef.current.y = null;
  };

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    initParticles(canvas);

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Restart animation when config changes
  useEffect(() => {
    if (canvasRef.current) {
      initParticles(canvasRef.current);
      if (!isPaused) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        animate();
      }
    }
  }, [config]);

  // Toggle pause/play
  useEffect(() => {
    if (!isPaused && canvasRef.current) {
      animate();
    }
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetAnimation = () => {
    if (canvasRef.current) {
      initParticles(canvasRef.current);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0"
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button
          onClick={togglePause}
          className="p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition text-white"
          title={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
        <button
          onClick={resetAnimation}
          className="p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition text-white"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition text-white"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Info */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-sm z-10">
        <p className="font-bold mb-1">Interactive Particles</p>
        <p className="text-white/70">Move your mouse to interact</p>
        <p className="text-white/70 mt-2">{config.particleCount} particles</p>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Particle Count */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Particle Count: {config.particleCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={config.particleCount}
                  onChange={(e) => setConfig({ ...config, particleCount: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Particle Size */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Particle Size: {config.particleSize}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={config.particleSize}
                  onChange={(e) => setConfig({ ...config, particleSize: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Particle Speed */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Speed: {config.particleSpeed}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={config.particleSpeed}
                  onChange={(e) => setConfig({ ...config, particleSpeed: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Connection Distance */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Connection Distance: {config.connectionDistance}px
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={config.connectionDistance}
                  onChange={(e) => setConfig({ ...config, connectionDistance: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Mouse Radius */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Mouse Effect Radius: {config.mouseRadius}px
                </label>
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={config.mouseRadius}
                  onChange={(e) => setConfig({ ...config, mouseRadius: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Color Scheme */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Color Scheme</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(colorSchemes).map(scheme => (
                    <button
                      key={scheme}
                      onClick={() => setConfig({ ...config, colorScheme: scheme })}
                      className={`px-4 py-2 rounded-lg capitalize transition ${
                        config.colorScheme === scheme
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {scheme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableConnections}
                    onChange={(e) => setConfig({ ...config, enableConnections: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Show Connections
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enableMouse}
                    onChange={(e) => setConfig({ ...config, enableMouse: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Mouse Interaction
                </label>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Quick Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConfig({ ...config, particleCount: 150, particleSpeed: 1, connectionDistance: 100, colorScheme: 'blue' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, particleCount: 300, particleSpeed: 2, connectionDistance: 80, colorScheme: 'rainbow' })}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Chaos
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, particleCount: 50, particleSpeed: 0.3, connectionDistance: 200, colorScheme: 'white' })}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Calm
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, particleCount: 200, particleSpeed: 1.5, connectionDistance: 150, colorScheme: 'green', particleSize: 5 })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Matrix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticleAnimation;
