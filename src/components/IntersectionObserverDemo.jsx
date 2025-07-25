import { useState, useEffect, useRef } from "react";

const IntersectionObserverDemo = ({ onBack }) => {
  const [entries, setEntries] = useState([]);
  const [options, setOptions] = useState({
    threshold: 0.5,
    rootMargin: "0px",
    trackVisibility: false,
  });
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  // Create observer elements
  const createObserverElements = () => {
    const elements = [];
    for (let i = 1; i <= 10; i++) {
      elements.push({
        id: i,
        text: `Element ${i}`,
        color: `hsl(${(i * 36) % 360}, 70%, 50%)`,
        isIntersecting: false,
        intersectionRatio: 0,
        lastUpdate: null,
      });
    }
    return elements;
  };

  const [observableElements, setObservableElements] = useState(
    createObserverElements()
  );

  useEffect(() => {
    const callback = (observerEntries) => {
      observerEntries.forEach((entry) => {
        const elementId = parseInt(entry.target.dataset.id);
        setObservableElements((prev) =>
          prev.map((el) =>
            el.id === elementId
              ? {
                  ...el,
                  isIntersecting: entry.isIntersecting,
                  intersectionRatio: entry.intersectionRatio,
                  lastUpdate: new Date().toLocaleTimeString(),
                }
              : el
          )
        );
      });

      setEntries(
        observerEntries.map((entry) => ({
          id: parseInt(entry.target.dataset.id),
          isIntersecting: entry.isIntersecting,
          intersectionRatio: Math.round(entry.intersectionRatio * 100),
          boundingClientRect: entry.boundingClientRect,
          rootBounds: entry.rootBounds,
          time: entry.time,
          timestamp: new Date().toLocaleTimeString(),
        }))
      );
    };

    // Create intersection observer
    observerRef.current = new IntersectionObserver(callback, {
      root: containerRef.current,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    });

    // Observe all elements
    const elements = document.querySelectorAll("[data-observable]");
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  const updateOptions = (newOptions) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const scrollToElement = (elementId) => {
    const element = document.querySelector(`[data-id="${elementId}"]`);
    if (element && containerRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const resetElements = () => {
    setObservableElements(createObserverElements());
    setEntries([]);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Intersection Observer API
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor when elements enter or leave the viewport
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Threshold: {options.threshold}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={options.threshold}
              onChange={(e) =>
                updateOptions({ threshold: parseFloat(e.target.value) })
              }
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              Percentage of element that must be visible to trigger
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Root Margin
            </label>
            <select
              value={options.rootMargin}
              onChange={(e) => updateOptions({ rootMargin: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="0px">0px (default)</option>
              <option value="50px">50px (expand root)</option>
              <option value="-50px">-50px (shrink root)</option>
              <option value="50px 0px">50px 0px (vertical expand)</option>
              <option value="0px 50px">0px 50px (horizontal expand)</option>
            </select>
            <div className="text-xs text-gray-500 mt-1">
              Margins around the root element
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetElements}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Status Panel */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Intersection Status
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {observableElements.map((el) => (
                <div
                  key={el.id}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer transition-colors ${
                    el.isIntersecting
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                  onClick={() => scrollToElement(el.id)}
                >
                  <span className="font-medium">{el.text}</span>
                  <div className="text-right">
                    <div className="text-sm">
                      {el.isIntersecting ? "👁️ Visible" : "🙈 Hidden"}
                    </div>
                    <div className="text-xs">
                      {Math.round(el.intersectionRatio * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Scrollable Area</h3>
          <div
            ref={containerRef}
            className="h-80 overflow-y-auto border-2 border-gray-300 rounded-lg p-4 bg-gray-50"
          >
            <div className="space-y-8">
              {observableElements.map((el) => (
                <div
                  key={el.id}
                  data-id={el.id}
                  data-observable="true"
                  className={`relative p-6 rounded-lg transition-all duration-300 transform ${
                    el.isIntersecting
                      ? "scale-105 shadow-lg border-2 border-blue-500"
                      : "scale-100 shadow border border-gray-300"
                  }`}
                  style={{
                    backgroundColor: el.isIntersecting
                      ? el.color + "20"
                      : "#ffffff",
                    borderColor: el.isIntersecting ? el.color : "#d1d5db",
                  }}
                >
                  <div className="text-center">
                    <h4
                      className="text-lg font-bold"
                      style={{ color: el.color }}
                    >
                      {el.text}
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Scroll to see intersection detection in action
                    </p>
                    {el.isIntersecting && (
                      <div className="mt-2 text-sm text-green-600">
                        ✨ Currently intersecting (
                        {Math.round(el.intersectionRatio * 100)}%)
                      </div>
                    )}
                    {el.lastUpdate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Last update: {el.lastUpdate}
                      </div>
                    )}
                  </div>

                  {/* Intersection indicator */}
                  <div
                    className="absolute top-2 right-2 w-4 h-4 rounded-full transition-colors"
                    style={{
                      backgroundColor: el.isIntersecting
                        ? "#22c55e"
                        : "#ef4444",
                    }}
                  />
                </div>
              ))}

              {/* Extra content to enable scrolling */}
              <div className="h-40 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-lg">🎯</div>
                  <div>End of scrollable content</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap gap-1">
            {observableElements.map((el) => (
              <button
                key={el.id}
                onClick={() => scrollToElement(el.id)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  el.isIntersecting
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {el.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Entries Log */}
      {entries.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">
            Recent Intersection Events
          </h3>
          <div className="max-h-32 overflow-y-auto text-sm space-y-1">
            {entries
              .slice(-5)
              .reverse()
              .map((entry, index) => (
                <div
                  key={`${entry.id}-${entry.time}`}
                  className="flex justify-between"
                >
                  <span>Element {entry.id}</span>
                  <span
                    className={
                      entry.isIntersecting ? "text-green-600" : "text-red-600"
                    }
                  >
                    {entry.isIntersecting ? "Entered" : "Left"} (
                    {entry.intersectionRatio}%)
                  </span>
                  <span className="text-gray-500">{entry.timestamp}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntersectionObserverDemo;
