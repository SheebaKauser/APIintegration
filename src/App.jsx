import { useState } from "react";
import BackgroundTasksDemo from "./components/BackgroundTasksDemo";
import CanvasDemo from "./components/CanvasDemo";
import GeolocationDemo from "./components/GeolocationDemo";
import IntersectionObserverDemo from "./components/IntersectionObserverDemo";
import NetworkInformationDemo from "./components/NetworkInformationDemo";

function App() {
  const [activeDemo, setActiveDemo] = useState("home");

  const demos = [
    {
      id: "background-tasks",
      name: "Background Tasks API",
      icon: "⏱️",
      component: BackgroundTasksDemo,
      description: "Execute tasks during browser idle time",
    },
    {
      id: "canvas",
      name: "Canvas API",
      icon: "🎨",
      component: CanvasDemo,
      description: "Interactive 2D graphics and drawing",
    },
    {
      id: "geolocation",
      name: "Geolocation API",
      icon: "📍",
      component: GeolocationDemo,
      description: "Access device location information",
    },
    {
      id: "intersection-observer",
      name: "Intersection Observer API",
      icon: "👁️",
      component: IntersectionObserverDemo,
      description: "Monitor element visibility changes",
    },
    {
      id: "network-information",
      name: "Network Information API",
      icon: "📶",
      component: NetworkInformationDemo,
      description: "Detect connection quality and type",
    },
  ];

  const ActiveComponent = demos.find(
    (demo) => demo.id === activeDemo
  )?.component;

  // Home component
  const HomeComponent = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
          Welcome to Web APIs Demo
        </h2>
        <p className="text-xl text-purple-100 mb-8 leading-relaxed">
          Explore modern browser APIs with interactive examples and beautiful
          interfaces
        </p>
        <div className="text-8xl mb-8 animate-bounce">🌐</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demos.map((demo) => (
          <div
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className="group bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-110 border border-white/20 hover:border-white/40 transform hover:-rotate-1"
          >
            <div className="text-center">
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                {demo.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                {demo.name}
              </h3>
              <p className="text-sm text-purple-200 mb-6 leading-relaxed">
                {demo.description}
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Try Demo →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          🚀 What You'll Learn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
            <span className="text-green-400 text-xl">✓</span>
            <span className="text-purple-100">
              How to use modern Web APIs in real applications
            </span>
          </div>
          <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
            <span className="text-green-400 text-xl">✓</span>
            <span className="text-purple-100">
              Browser compatibility and fallback strategies
            </span>
          </div>
          <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
            <span className="text-green-400 text-xl">✓</span>
            <span className="text-purple-100">
              Performance optimization techniques
            </span>
          </div>
          <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
            <span className="text-green-400 text-xl">✓</span>
            <span className="text-purple-100">
              Best practices for user experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
          
              <p className="text-purple-200 mt-2 text-lg">
                Explore modern browser APIs with interactive examples
              </p>
            </div>
            <div className="text-5xl animate-pulse">🚀</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        {activeDemo !== "home" && (
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
              <li className="inline-flex items-center">
                <button
                  onClick={() => setActiveDemo("home")}
                  className="inline-flex items-center text-sm font-medium text-white hover:text-purple-200 transition-colors"
                >
                  <span className="mr-2">🏠</span>
                  Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-purple-300">/</span>
                  <span className="text-sm font-medium text-purple-200">
                    {demos.find((demo) => demo.id === activeDemo)?.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sticky top-8 border border-white/20">
              {/* Home Button */}
              <button
                onClick={() => setActiveDemo("home")}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 mb-6 transform hover:scale-105 ${
                  activeDemo === "home"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <div className="font-semibold">Home</div>
                    <div
                      className={`text-xs mt-1 ${
                        activeDemo === "home"
                          ? "text-purple-100"
                          : "text-purple-200"
                      }`}
                    >
                      Overview of all APIs
                    </div>
                  </div>
                </div>
              </button>

              <h2 className="text-xl font-bold text-white mb-6 tracking-wide">
                APIs
              </h2>
              <nav className="space-y-3">
                {demos.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveDemo(demo.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      activeDemo === demo.id
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{demo.icon}</span>
                      <div>
                        <div className="font-semibold">{demo.name}</div>
                        <div
                          className={`text-xs mt-1 ${
                            activeDemo === demo.id
                              ? "text-blue-100"
                              : "text-purple-200"
                          }`}
                        >
                          {demo.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Browser Support Info */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  🌐 Browser Support
                </h3>
                <div className="text-xs text-purple-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Background Tasks: Chrome, Firefox, Edge
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Canvas: All modern browsers
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Geolocation: All modern browsers
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Intersection Observer: All modern browsers
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    Network Information: Chrome, Edge (limited)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeDemo === "home" ? (
              <HomeComponent />
            ) : (
              ActiveComponent && (
                <ActiveComponent onBack={() => setActiveDemo("home")} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-purple-200">
            <p className="mb-4 text-lg">
              Built with React + Vite and styled with Tailwind CSS
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-white/20"
              >
                📚 MDN Web APIs
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 border border-white/20"
              >
                🔗 View Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
