import { useState, useEffect } from "react";

const NetworkInformationDemo = ({ onBack }) => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [connectionHistory, setConnectionHistory] = useState([]);
  const [isSupported, setIsSupported] = useState(false);
  const [adaptiveContent, setAdaptiveContent] = useState("auto");

  useEffect(() => {
    // Check if Network Information API is supported
    if (
      "connection" in navigator ||
      "mozConnection" in navigator ||
      "webkitConnection" in navigator
    ) {
      setIsSupported(true);

      // Get connection object (with vendor prefixes for compatibility)
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      const updateConnectionInfo = () => {
        const info = {
          effectiveType: connection.effectiveType || "unknown",
          type: connection.type || "unknown",
          downlink: connection.downlink || "unknown",
          downlinkMax: connection.downlinkMax || "unknown",
          rtt: connection.rtt || "unknown",
          saveData: connection.saveData || false,
          timestamp: new Date().toLocaleTimeString(),
        };

        setNetworkInfo(info);

        // Add to history if this is a change
        setConnectionHistory((prev) => {
          const lastEntry = prev[prev.length - 1];
          if (
            !lastEntry ||
            lastEntry.effectiveType !== info.effectiveType ||
            lastEntry.type !== info.type
          ) {
            return [...prev.slice(-9), info]; // Keep last 10 entries
          }
          return prev;
        });

        // Auto-adapt content based on connection
        adaptContentBasedOnConnection(info.effectiveType);
      };

      // Initial update
      updateConnectionInfo();

      // Listen for connection changes
      connection.addEventListener("change", updateConnectionInfo);

      return () => {
        connection.removeEventListener("change", updateConnectionInfo);
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  const adaptContentBasedOnConnection = (effectiveType) => {
    if (adaptiveContent === "auto") {
      switch (effectiveType) {
        case "slow-2g":
        case "2g":
          setAdaptiveContent("text-only");
          break;
        case "3g":
          setAdaptiveContent("low-quality");
          break;
        case "4g":
        default:
          setAdaptiveContent("high-quality");
          break;
      }
    }
  };

  const getConnectionQuality = (effectiveType) => {
    switch (effectiveType) {
      case "slow-2g":
        return {
          label: "Very Slow",
          color: "text-red-600",
          bgColor: "bg-red-100",
        };
      case "2g":
        return {
          label: "Slow",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        };
      case "3g":
        return {
          label: "Moderate",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        };
      case "4g":
        return {
          label: "Fast",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      default:
        return {
          label: "Unknown",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  const getConnectionIcon = (effectiveType) => {
    switch (effectiveType) {
      case "slow-2g":
      case "2g":
        return "📶";
      case "3g":
        return "📶📶";
      case "4g":
        return "📶📶📶";
      default:
        return "❓";
    }
  };

  const simulateConnectionChange = () => {
    // This is just for demonstration - real connection changes come from the browser
    const types = ["slow-2g", "2g", "3g", "4g"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const simulatedInfo = {
      effectiveType: randomType,
      type: "cellular",
      downlink: Math.random() * 10,
      downlinkMax: Math.random() * 100,
      rtt: Math.floor(Math.random() * 200) + 50,
      saveData: Math.random() > 0.7,
      timestamp: new Date().toLocaleTimeString(),
      simulated: true,
    };

    setNetworkInfo(simulatedInfo);
    setConnectionHistory((prev) => [...prev.slice(-9), simulatedInfo]);
    adaptContentBasedOnConnection(randomType);
  };

  const renderAdaptiveContent = () => {
    switch (adaptiveContent) {
      case "text-only":
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800">Text-Only Mode</h4>
            <p className="text-red-700 mt-2">
              Due to slow connection, only text content is loaded. Images and
              videos are disabled.
            </p>
            <ul className="list-disc list-inside text-red-600 mt-2 text-sm">
              <li>No images loaded</li>
              <li>No video content</li>
              <li>Minimal CSS/JS</li>
              <li>Compressed text only</li>
            </ul>
          </div>
        );
      case "low-quality":
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800">Low Quality Mode</h4>
            <p className="text-yellow-700 mt-2">
              Optimized for moderate connection speed with reduced quality
              media.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-yellow-200 h-20 rounded flex items-center justify-center text-yellow-800">
                🖼️ Low-res image
              </div>
              <div className="bg-yellow-200 h-20 rounded flex items-center justify-center text-yellow-800">
                🎥 480p video
              </div>
            </div>
          </div>
        );
      case "high-quality":
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800">High Quality Mode</h4>
            <p className="text-green-700 mt-2">
              Full experience with high-resolution media and all features
              enabled.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-green-200 h-20 rounded flex items-center justify-center text-green-800">
                🖼️ HD images
              </div>
              <div className="bg-green-200 h-20 rounded flex items-center justify-center text-green-800">
                🎥 4K video
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Network Information API
        </h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-semibold">Not Supported</h3>
          <p className="mt-2">
            The Network Information API is not supported in this browser. This
            API is primarily supported in Chrome and Chromium-based browsers.
          </p>
          <p className="mt-2 text-sm">
            Try opening this demo in Google Chrome, Microsoft Edge, or Samsung
            Internet for the best experience.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={simulateConnectionChange}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Simulate Connection Change
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Click to see how the interface would adapt to different connection
            types
          </p>
        </div>
      </div>
    );
  }

  const quality = networkInfo
    ? getConnectionQuality(networkInfo.effectiveType)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Network Information API
      </h2>
      <p className="text-gray-600 mb-4">
        Monitor network connection quality and adapt content accordingly
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={simulateConnectionChange}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Simulate Connection Change
        </button>

        <select
          value={adaptiveContent}
          onChange={(e) => setAdaptiveContent(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="auto">Auto Adapt</option>
          <option value="high-quality">Force High Quality</option>
          <option value="low-quality">Force Low Quality</option>
          <option value="text-only">Force Text Only</option>
        </select>
      </div>

      {networkInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Current Connection Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Current Connection
            </h3>

            <div
              className={`flex items-center justify-between p-3 rounded-lg mb-3 ${quality.bgColor}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {getConnectionIcon(networkInfo.effectiveType)}
                </span>
                <div>
                  <div className={`font-semibold ${quality.color}`}>
                    {networkInfo.effectiveType.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {quality.label} Connection
                  </div>
                </div>
              </div>
              {networkInfo.simulated && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Simulated
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Connection Type:</span>
                <span className="font-medium">{networkInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Downlink:</span>
                <span className="font-medium">
                  {networkInfo.downlink !== "unknown"
                    ? `${networkInfo.downlink} Mbps`
                    : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Downlink:</span>
                <span className="font-medium">
                  {networkInfo.downlinkMax !== "unknown"
                    ? `${networkInfo.downlinkMax} Mbps`
                    : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">RTT:</span>
                <span className="font-medium">
                  {networkInfo.rtt !== "unknown"
                    ? `${networkInfo.rtt}ms`
                    : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Saver:</span>
                <span
                  className={`font-medium ${
                    networkInfo.saveData ? "text-orange-600" : "text-green-600"
                  }`}
                >
                  {networkInfo.saveData ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium">{networkInfo.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Connection History */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Connection History
            </h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {connectionHistory.length === 0 ? (
                <div className="text-gray-500 text-center py-4">
                  No connection changes detected yet
                </div>
              ) : (
                connectionHistory
                  .slice()
                  .reverse()
                  .map((conn, index) => {
                    const historyQuality = getConnectionQuality(
                      conn.effectiveType
                    );
                    return (
                      <div
                        key={index}
                        className={`p-2 rounded ${historyQuality.bgColor}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span>{getConnectionIcon(conn.effectiveType)}</span>
                            <span
                              className={`font-medium ${historyQuality.color}`}
                            >
                              {conn.effectiveType.toUpperCase()}
                            </span>
                            {conn.simulated && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                                SIM
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-600">
                            {conn.timestamp}
                          </span>
                        </div>
                        {conn.downlink !== "unknown" && (
                          <div className="text-xs text-gray-600 mt-1">
                            {conn.downlink.toFixed(1)} Mbps • {conn.rtt}ms RTT
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adaptive Content Demo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Adaptive Content
        </h3>
        {renderAdaptiveContent()}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          💡 Implementation Tips
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Use effective connection type to determine content quality</li>
          <li>• Respect the saveData flag to reduce bandwidth usage</li>
          <li>• Preload content on fast connections, defer on slow ones</li>
          <li>• Consider RTT for time-sensitive operations</li>
          <li>• Listen for connection changes to adapt in real-time</li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkInformationDemo;
