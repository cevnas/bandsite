'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from "convex/react";
import { useStorageUrl } from "convex/react-storage";
import { api } from "../../convex/_generated/api";

interface Video {
  _id: string;
  _creationTime: number;
  title: string;
  description: string;
  storageId: string;
}

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const galleryVideos = useQuery(api.videos.getVideos);

  const openLightbox = (index: number) => {
    setSelectedVideo(index);
  };

  const closeLightbox = () => {
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    if (selectedVideo !== null && galleryVideos && galleryVideos.length > 0) {
      setSelectedVideo((selectedVideo + 1) % galleryVideos.length);
    }
  };

  const prevVideo = () => {
    if (selectedVideo !== null && galleryVideos && galleryVideos.length > 0) {
      setSelectedVideo(selectedVideo === 0 ? galleryVideos.length - 1 : selectedVideo - 1);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="relative z-10 container-padding text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="gradient-text">Music Videos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Check out our latest music videos.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      {selectedVideo === null && (
        <section className="section-padding bg-gray-900">
          <div className="container-padding">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryVideos?.map((video: Video, index: number) => (
                <VideoThumbnail key={video._id} video={video} index={index} openLightbox={openLightbox} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedVideo !== null && galleryVideos && galleryVideos.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevVideo}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
            >
              ←
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
            >
              →
            </button>

            {/* Video */}
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center relative">
              <video src={useStorageUrl(galleryVideos[selectedVideo].storageId)} controls className="w-full h-full rounded-xl"></video>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                <h3 className="text-2xl font-bold text-white mb-2">{galleryVideos[selectedVideo].title}</h3>
                <p className="text-gray-300">{galleryVideos[selectedVideo].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-black">
        <div className="container-padding text-center">
          <h2 className="text-4xl font-bold mb-6">
            Follow Our <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stay connected with Knotty Buoys on social media for the latest photos,
            behind-the-scenes content, and exclusive updates.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-4 rounded-full transition-colors duration-200">
              📷 Instagram
            </a>
            <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-4 rounded-full transition-colors duration-200">
              📘 Facebook
            </a>
            <a href="#" className="bg-gray-800 hover:bg-red-600 text-white p-4 rounded-full transition-colors duration-200">
              📺 YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoThumbnail({ video, index, openLightbox }: { video: Video, index: number, openLightbox: (index: number) => void }) {
  const videoUrl = useStorageUrl(video.storageId);

  if (!videoUrl) {
    return null; // Or a loading state
  }

  return (
    <div
      key={video._id}
      className="group cursor-pointer"
      onClick={() => openLightbox(index)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl overflow-hidden">
         <video src={videoUrl} className="absolute inset-0 w-full h-full object-cover"></video>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-sm font-semibold mb-0.5">{video.title}</h3>
          <p className="text-gray-300 text-sm">{video.description}</p>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-all duration-300"></div>
      </div>
    </div>
  );
}
