import { useState, useEffect } from "react";

const GeolocationDemo = ({ onBack }) => {
  const [location, setLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);

  const formatCoordinate = (coord) => {
    return coord ? coord.toFixed(6) : "Unknown";
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setLocationHistory((prev) => [
          ...prev,
          {
            ...position,
            id: Date.now(),
            type: "single",
          },
        ]);
        setLoading(false);
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setLoading(false);
      },
      options
    );
  };

  const startWatching = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setError(null);
    setIsWatching(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    };

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
        setLocationHistory((prev) => [
          ...prev,
          {
            ...position,
            id: Date.now(),
            type: "watch",
          },
        ]);
      },
      (error) => {
        setError(`Watch Error: ${error.message}`);
        setIsWatching(false);
      },
      options
    );

    setWatchId(id);
  };

  const stopWatching = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsWatching(false);
    }
  };

  const clearHistory = () => {
    setLocationHistory([]);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Geolocation API</h2>
          <p className="text-gray-600 mt-1">
            Get current location and track position changes
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <span>←</span>
            Back to Home
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={getCurrentPosition}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? "Getting Location..." : "Get Current Position"}
        </button>

        {!isWatching ? (
          <button
            onClick={startWatching}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Start Watching Position
          </button>
        ) : (
          <button
            onClick={stopWatching}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Stop Watching Position
          </button>
        )}

        <button
          onClick={clearHistory}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Clear History
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isWatching && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          📍 Watching position changes...
        </div>
      )}

      {location && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            Current Location
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Latitude:</span>
              <div className="text-gray-600">
                {formatCoordinate(location.coords.latitude)}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Longitude:</span>
              <div className="text-gray-600">
                {formatCoordinate(location.coords.longitude)}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Accuracy:</span>
              <div className="text-gray-600">
                {location.coords.accuracy
                  ? `${Math.round(location.coords.accuracy)}m`
                  : "Unknown"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Altitude:</span>
              <div className="text-gray-600">
                {location.coords.altitude
                  ? `${Math.round(location.coords.altitude)}m`
                  : "Unknown"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Heading:</span>
              <div className="text-gray-600">
                {location.coords.heading
                  ? `${Math.round(location.coords.heading)}°`
                  : "Unknown"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Speed:</span>
              <div className="text-gray-600">
                {location.coords.speed
                  ? `${(location.coords.speed * 3.6).toFixed(1)} km/h`
                  : "Unknown"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Last updated: {formatTimestamp(location.timestamp)}
          </div>
        </div>
      )}

      {locationHistory.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Location History ({locationHistory.length} entries)
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {locationHistory
              .slice(-10)
              .reverse()
              .map((loc, index) => (
                <div key={loc.id} className="bg-white rounded p-3 text-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        loc.type === "watch"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {loc.type === "watch" ? "Watched" : "Single"}
                    </span>
                    <span className="text-gray-500">
                      {formatTimestamp(loc.timestamp)}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    {formatCoordinate(loc.coords.latitude)},{" "}
                    {formatCoordinate(loc.coords.longitude)}
                  </div>
                  <div className="text-gray-500 text-xs">
                    Accuracy: {Math.round(loc.coords.accuracy)}m
                    {index < locationHistory.length - 1 &&
                      locationHistory[
                        locationHistory.length - 1 - index - 1
                      ] && (
                        <span className="ml-2">
                          Distance from previous:{" "}
                          {calculateDistance(
                            loc.coords.latitude,
                            loc.coords.longitude,
                            locationHistory[
                              locationHistory.length - 1 - index - 1
                            ].coords.latitude,
                            locationHistory[
                              locationHistory.length - 1 - index - 1
                            ].coords.longitude
                          ).toFixed(3)}{" "}
                          km
                        </span>
                      )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {navigator.geolocation && (
        <div className="mt-4 text-xs text-gray-500">
          💡 Tip: Grant location permission when prompted for the best
          experience
        </div>
      )}
    </div>
  );
};

export default GeolocationDemo;
