import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // DEMO IMAGES - Working example images that will display immediately
  const images = [
    {
      url: "https://picsum.photos/800/500?random=1",
      title: "Beautiful Landscape",
      description: "Stunning mountain scenery"
    },
    {
      url: "https://picsum.photos/800/500?random=2", 
      title: "Ocean View",
      description: "Peaceful ocean waves"
    },
    {
      url: "https://picsum.photos/800/500?random=3",
      title: "Forest Path",
      description: "Mystical forest trail"
    }
    
    // TO USE YOUR OWN IMAGES - Replace URLs above with:
    // METHOD 1: Local images in public folder
    // url: "/images/your-image.jpg"  (put images in public/images/ folder)
    
    // METHOD 2: External URLs  
    // url: "https://your-site.com/image.jpg"
    
    // METHOD 3: Import from src (add import at top of file)
    // import myImage from './assets/image.jpg'; then use: url: myImage
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white-800 mb-2">Image Carousel</h1>
          <p className="text-white-600">Auto-playing carousel with hover controls</p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Images Container */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentIndex 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : index < currentIndex
                    ? '-translate-x-full opacity-0 scale-95'
                    : 'translate-x-full opacity-0 scale-95'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23667eea"/><text x="400" y="250" text-anchor="middle" fill="white" font-size="24" font-family="Arial">Image ${index + 1}</text></svg>`;
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Text Content Overlay */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="p-6 md:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>
                      <p className="text-sm md:text-lg opacity-90 drop-shadow-md">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Play/Pause Control */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Pause Indicator */}
          {isPaused && (
            <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Paused
            </div>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
              isPlaying && !isPaused ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`,
              transition: 'width 0.7s ease-in-out'
            }}
          />
        </div>

        {/* Status Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Image {currentIndex + 1} of {images.length} • 
            {isPlaying ? (isPaused ? ' Paused (hover)' : ' Auto-playing') : ' Manual'}
          </p>
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Features:</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Auto-plays every 3 seconds</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Pauses on hover</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Smooth transitions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Manual navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Progress indicator</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Responsive design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
