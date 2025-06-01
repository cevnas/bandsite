import { PlayIcon } from '@heroicons/react/24/outline';

export default function Music() {
  const albums = [
    {
      title: "Neon Dreams",
      year: "2024",
      type: "Latest Album",
      description: "Our most ambitious work yet, blending electronic elements with calm guitar resonance.",
      tracks: [
        "Electric Storm",
        "Neon Nights",
        "Voltage Rising",
        "Digital Heart",
        "Thunder Road",
        "Pulse of the City",
        "Lightning Strike",
        "Electric Dreams"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Underground",
      year: "2022",
      type: "Album",
      description: "A raw exploration of the underground music scene that shaped our sound.",
      tracks: [
        "Basement Anthem",
        "Underground King",
        "Rebel's Call",
        "City Lights",
        "Breaking Free",
        "Raw Energy",
        "Street Symphony"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Voltage",
      year: "2021",
      type: "EP",
      description: "Our debut EP that introduced the world to the Naughtyy Bouyeez sound.",
      tracks: [
        "First Spark",
        "High Voltage",
        "Electric Pulse",
        "Power Surge",
        "Live Wire"
      ],
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const streamingPlatforms = [
    { name: "Spotify", icon: "🎵", url: "#" },
    { name: "Apple Music", icon: "🍎", url: "#" },
    { name: "YouTube Music", icon: "📺", url: "#" },
    { name: "SoundCloud", icon: "☁️", url: "#" },
    { name: "Bandcamp", icon: "🎪", url: "#" }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="relative z-10 container-padding text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            Our <span className="gradient-text">Music</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our discography and experience the resonant sound that defines our sound. 
            From underground anthems to mainstream hits, discover the pulse that drives our music.
          </p>
          
          {/* Streaming Platforms */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {streamingPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span className="text-xl">{platform.icon}</span>
                <span className="text-white font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Albums Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-padding">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            <span className="gradient-text">Discography</span>
          </h2>
          
          <div className="space-y-12">
            {albums.map((album, index) => (
              <div key={index} className="card">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Album Cover */}
                  <div className="lg:col-span-1">
                    <div className={`aspect-square bg-gradient-to-br ${album.color} rounded-xl flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-6xl text-white font-bold opacity-20">EP</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">{album.title}</h3>
                          <p className="text-white/80">{album.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Album Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {album.type}
                      </span>
                      <span className="text-gray-400">{album.year}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-4">{album.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{album.description}</p>
                    
                    {/* Track List */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Track List</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {album.tracks.map((track, trackIndex) => (
                          <div
                            key={trackIndex}
                            className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer group"
                          >
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-semibold">
                              {trackIndex + 1}
                            </div>
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                              {track}
                            </span>
                            <PlayIcon className="h-4 w-4 text-gray-500 group-hover:text-blue-400 ml-auto transition-colors duration-200" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Listen Button */}
                    <div className="mt-6">
                      <button className="btn-primary inline-flex items-center gap-2">
                        <PlayIcon className="h-5 w-5" />
                        Listen Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Video Section */}
      <section className="section-padding bg-black">
        <div className="container-padding">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest <span className="gradient-text">Music Video</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                  <PlayIcon className="h-10 w-10 text-white ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">"Electric Storm"</h3>
                <p className="text-white/80">Official Music Video</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-300 mb-6">
                Watch our latest music video featuring stunning visuals and electrifying performances 
                that capture the essence of Naughtyy Bouyeez.
              </p>
              <button className="btn-primary">
                Watch on YouTube
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
