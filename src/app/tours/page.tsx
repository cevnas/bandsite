'use client';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Using axios as per example
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function tours() {
  const [visibleAddressIndex, setVisibleAddressIndex] = useState<number | null>(null);

  // State variables for fetched data
  const [upcomingtours, setUpcomingtours] = useState<any[]>([]);
  const [pasttours, setPasttours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to parse date string in DD/MM/YYYY HH:mm:ss format
  const parseDate = (dateString: string) => {
    const parts = dateString.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
    if (!parts) return new Date('Invalid Date'); // Return invalid date if format doesn't match

    // Note: Month is 0-indexed in JavaScript Date objects
    const year = parseInt(parts[3], 10);
    const month = parseInt(parts[2], 10) - 1; // Adjust month
    const day = parseInt(parts[1], 10);
    const hours = parseInt(parts[4], 10);
    const minutes = parseInt(parts[5], 10);
    const seconds = parseInt(parts[6], 10);

    return new Date(year, month, day, hours, minutes, seconds);
  };

  // Fetch data from Sheet.best API using axios
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.sheetbest.com/sheets/95eac4f4-1f02-450f-babd-b538504a685b', {
          headers: {
            'Authorization': `Bearer u!6XjE-4yzJfj23wQOvA$1qHM!-o8@C3_UU719k1b-mw2rQy4VsT$X_GRYXG-AcE`
          }
        });

        const data = response.data;

        // Process data: filter, sort, and split
        const cleanedData = data
          .filter((event: any) => event["Start time"] && event["Location"] && !isNaN(parseDate(event["Start time"]).getTime())) // skip empty rows or invalid dates
          .sort((a: any, b: any) => parseDate(a["Start time"]).getTime() - parseDate(b["Start time"]).getTime()); // sort by date

        const now = new Date();

        // Ensure comparison is done correctly, comparing date objects
        const upcoming = cleanedData.filter((show: any) => parseDate(show["Start time"]).getTime() >= now.getTime());
        const past = cleanedData.filter((show: any) => parseDate(show["Start time"]).getTime() < now.getTime());

        setUpcomingtours(upcoming);
        setPasttours(past);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const formatDate = (dateString: string) => {
    const date = parseDate(dateString); // Use the custom parseDate function
    // Add a check for invalid dates
    if (isNaN(date.getTime())) {
      return { month: 'N/A', day: 'N/A', weekday: 'N/A' };
    }
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
    };
  };

  const toggleAddressVisibility = (index: number) => {
    setVisibleAddressIndex(visibleAddressIndex === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-black via-blue-900/20 to-black">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="relative z-10 container-padding text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="gradient-text">Show</span> Dates
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience Ireland and Newfoundland together!.
          </p>
        </div>
      </section>

      {/* Loading and Error Handling */}
      {loading && (
        <section className="section-padding bg-gray-900 text-center text-white">
          Loading show dates...
        </section>
      )}

      {error && (
        <section className="section-padding bg-gray-900 text-center text-red-500">
          Error loading show dates: {error}
        </section>
      )}

      {/* Render tours only when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Upcoming tours */}
          <section className="section-padding bg-gray-900">
            <div className="container-padding">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="gradient-text">Upcoming</span> tours
              </h2>

              <div className="space-y-6">
                {upcomingtours.length === 0 ? (
                  <p className="text-center text-gray-400">No upcoming events — stay tuned!</p>
                ) : (
                  upcomingtours.map((show, index) => {
                    const dateInfo = formatDate(show["Start time"]);
                    const isAddressVisible = visibleAddressIndex === index;
                    return (
                      <div
                        key={index}
                        className="card hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                        onClick={() => toggleAddressVisibility(index)}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Date */}
                          <div className="lg:col-span-2 text-center lg:text-left">
                            <div className="inline-block lg:block">
                              <div className="text-3xl font-bold text-white">{dateInfo.day}</div>
                              <div className="text-blue-400 font-semibold">{dateInfo.month}</div>
                              <div className="text-gray-400 text-sm">{dateInfo.weekday}</div>
                            </div>
                          </div>

                          {/* Venue Info */}
                          <div className="lg:col-span-10">
                            <h3 className="text-2xl font-bold text-white mb-2">{show["Location"]}</h3>
                            {/* Assuming city might be part of Location or a separate field if available */}
                            {/* <div className="flex items-center gap-2 text-gray-300 mb-2">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{show.city}</span>
                            </div> */}
                            {/* Display Activity type as the smaller grey text */}
                            {/* Display Address as the smaller grey text */}
                            {show["Address"] && <p className="text-gray-400 text-sm">{show["Address"]}</p>}
                            {show["Notes"] && <p className="text-gray-400 text-sm mt-1">📝 {show["Notes"]}</p>}

                            {/* Display full address from Address when expanded */}
                            {isAddressVisible && show["Address"] && (
                              <p className="text-blue-400 font-medium mt-2">
                                Full Address: {show["Address"]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* Past tours */}
          <section className="section-padding bg-black">
            <div className="container-padding">
              <h2 className="text-4xl font-bold text-center mb-12">
                Recent <span className="gradient-text">Performances</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pasttours.length === 0 ? (
                   <p className="text-center text-gray-400 md:col-span-3">No recent performances.</p>
                ) : (
                  pasttours.map((show, index) => {
                    const dateInfo = formatDate(show["Start time"]);
                    return (
                      <div key={index} className="card text-center opacity-75">
                        <div className="text-2xl font-bold text-white mb-2">{dateInfo.day} {dateInfo.month}</div>
                        <h3 className="text-lg font-semibold text-white mb-1">{show["Location"]}</h3>
                        {/* Assuming city might be part of Location or a separate field if available */}
                        {/* <p className="text-gray-400 mb-3">{show.city}</p> */}
                        {/* Assuming 'status' is a field in your sheet data */}
                        {show.status && (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {show.status}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container-padding text-center">
          <h2 className="text-4xl font-bold mb-6">
            Never Miss a <span className="gradient-text">Show</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new show dates and
            band updates.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
