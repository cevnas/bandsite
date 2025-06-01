export default function About() {
  const bandMembers = [
    {
      name: "Brendan Ryans",
      role: "Lead Vocals & Guitar",
      bio: "The driving force behind Naughtyy Bouyeez' sound, Brendan brings heartfelt emotion and powerful vocals that cut through the noise.",
      image: "🎸"
    },
    {
      name: "Will",
      role: "Lead Guitar",
      bio: "Will's thunderous bass lines form the backbone of our sound, creating the pulse that gets crowds moving.",
      image: "🎵"
    },
    {
      name: "Peter",
      role: "Bass Guitar", 
      bio: "Peter's guitar that gets crowds moving.",
      image: "🎵"
    }
    ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="relative z-10 container-padding text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="gradient-text">About</span> Naughtyy Bouyeez
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Born from the St. John's music scene, Naughtyy Bouyeez emerged in 2020 with a mission to
            captivate audiences with the spirit of Newfoundland music. Our sound blends traditional musical 
            foundations with modern electronic elements, creating an experience that's both nostalgic 
            and revolutionary.
          </p>
        </div>
      </section>

      {/* Band Story */}
      <section className="section-padding bg-gray-900">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Naughtyy Bouyeez was formed in the basement of an old warehouse in downtown, where four
                  musicians with different backgrounds came together with a shared vision: to create music 
                  that would evoke the spirit of traditional music.
                </p>
                <p>
                  What started as late-night jam sessions quickly evolved into something extraordinary. 
                  Our unique blend of melodic guitar arrangements, electronic beats, and powerful vocals caught 
                  the attention of the underground scene, leading to our first EP "Voltage" in 2021.
                </p>
                <p>
                  Since then, we've played over 100 tours across the country, released two full albums, 
                  and built a dedicated fanbase that shares our passion for authentic, heartfelt Newfoundland music.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-8xl">
                🎤
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl">
                ⚡
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band Members */}
      <section className="section-padding bg-black">
        <div className="container-padding">
          <h2 className="text-4xl font-bold text-center mb-12">
            Meet the <span className="gradient-text">Band</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <div key={index} className="card text-center group">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container-padding text-center">
          <h2 className="text-4xl font-bold mb-8">
            Our <span className="gradient-text">Mission</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We believe music should be felt, not just heard. Every song we create, every performance we give, 
              is designed to create an electric connection between the band and our audience. We're not just 
              playing music – we're creating experiences that resonate long after the last note fades.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-lg font-semibold text-white mb-2">Authentic Energy</h3>
                <p className="text-gray-400 text-sm">Raw, unfiltered passion in every performance</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                <p className="text-gray-400 text-sm">Pushing boundaries while respecting musical traditions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-white mb-2">Connection</h3>
                <p className="text-gray-400 text-sm">Building a community through shared musical experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
