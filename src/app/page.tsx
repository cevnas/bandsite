import Link from 'next/link';
import { PlayIcon, CalendarIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900/20 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center container-padding">
          <h1 className="text-6xl sm:text-8xl font-bold mb-6 text-shadow">
            <span className="gradient-text">Naughty</span>
            <br />
            <span className="text-white">Bouyeez</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
           Experience the sounds of Newfoundland and Ireland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/music" className="btn-primary inline-flex items-center gap-2">
              <PlayIcon className="h-5 w-5" />
              Listen Now
            </Link>
            <Link href="/tours" className="btn-secondary inline-flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Show Dates
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="section-padding bg-gray-900">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Latest Album */}
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MusicalNoteIcon className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Latest Album</h3>
              <p className="text-gray-400 mb-4">"Something Something" - Our latest collection of wavey tracks</p>
              <Link href="/music" className="text-blue-400 hover:text-blue-300 font-semibold">
                Listen Now →
              </Link>
            </div>

            {/* Next Show */}
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CalendarIcon className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Next Show</h3>
              <p className="text-gray-400 mb-4">At the RNYC, where we always play</p>
              <Link href="/tours" className="text-blue-400 hover:text-blue-300 font-semibold">
                Learn More →
              </Link>
            </div>

            {/* Band News */}
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Latest News</h3>
              <p className="text-gray-400 mb-4">New music video for "Something Something" drops next week</p>
              <Link href="/about" className="text-blue-400 hover:text-blue-300 font-semibold">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
