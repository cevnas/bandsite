'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Video {
  id: string; // Assuming Supabase uses 'id' as primary key
  created_at: string; // Assuming Supabase uses 'created_at'
  title: string;
  description: string;
  filePath: string; // Renamed from storageId to filePath for Supabase
  publicUrl?: string; // Add publicUrl for convenience
}

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [galleryVideos, setGalleryVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDescription, setNewVideoDescription] = useState('');


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) {
          throw new Error(`Error fetching videos: ${res.statusText}`);
        }
        const data = await res.json();
        setGalleryVideos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []); // Fetch videos on component mount

  // Refetch videos after a successful upload
  useEffect(() => {
    if (uploadSuccess) {
      const fetchVideos = async () => {
        try {
          const res = await fetch('/api/videos');
          if (!res.ok) {
            throw new Error(`Error fetching videos: ${res.statusText}`);
          }
          const data = await res.json();
          setGalleryVideos(data);
        } catch (err: any) {
          setError(err.message);
        }
      };
      fetchVideos();
      setUploadSuccess(false); // Reset success state
    }
  }, [uploadSuccess]);


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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewVideoFile(event.target.files[0]);
    } else {
      setNewVideoFile(null);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setUploadError(null);

    if (!newVideoFile) {
      setUploadError('Please select a file to upload.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', newVideoFile);
    formData.append('title', newVideoTitle);
    formData.append('description', newVideoDescription);

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Upload failed: ${errorData.error || res.statusText}`);
      }

      // Handle successful upload
      setNewVideoFile(null);
      setNewVideoTitle('');
      setNewVideoDescription('');
      setUploadSuccess(true); // Trigger refetch
      console.log('Video uploaded successfully!');

    } catch (err: any) {
      setUploadError(err.message);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
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

      {/* Upload Form */}
      <section className="section-padding bg-gray-800">
        <div className="container-padding max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Upload New Video</h2>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div>
              <label htmlFor="videoFile" className="block text-gray-300 text-sm font-bold mb-2">
                Video File:
              </label>
              <input
                type="file"
                id="videoFile"
                accept="video/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label htmlFor="videoTitle" className="block text-gray-300 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                id="videoTitle"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label htmlFor="videoDescription" className="block text-gray-300 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                id="videoDescription"
                value={newVideoDescription}
                onChange={(e) => setNewVideoDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </button>
            {uploadError && <p className="text-red-500 text-sm italic">{uploadError}</p>}
            {uploadSuccess && <p className="text-green-500 text-sm italic">Upload successful!</p>}
          </form>
        </div>
      </section>


      {/* Video Grid */}
      {selectedVideo === null && (
        <section className="section-padding bg-gray-900">
          <div className="container-padding">
            {loading && <p className="text-center text-gray-400">Loading videos...</p>}
            {error && <p className="text-center text-red-500">Error loading videos: {error}</p>}
            {!loading && !error && galleryVideos.length === 0 && (
              <p className="text-center text-gray-400">No videos found.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryVideos?.map((video: Video, index: number) => (
                <VideoThumbnail key={video.id} video={video} index={index} openLightbox={openLightbox} />
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
              {/* Use video.publicUrl directly */}
              <video src={galleryVideos[selectedVideo].publicUrl} controls className="w-full h-full rounded-xl"></video>
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
            <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-4 rounded-full transition-colors duration-200">
              📺 YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function VideoThumbnail({ video, index, openLightbox }: { video: Video, index: number, openLightbox: (index: number) => void }) {
  // Use video.publicUrl directly
  const videoUrl = video.publicUrl;

  return (
    <div
      key={video.id} // Assuming Supabase uses 'id'
      className="group cursor-pointer"
      onClick={() => openLightbox(index)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl overflow-hidden">
         {/* Use videoUrl directly */}
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
