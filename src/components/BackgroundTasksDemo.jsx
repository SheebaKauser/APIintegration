import { useState, useEffect, useRef } from "react";

const BackgroundTasksDemo = ({ onBack }) => {
  const [tasks, setTasks] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const taskIdRef = useRef(0);

  // Task queue for background processing
  const enqueueTask = (taskData) => {
    const newTask = {
      id: taskIdRef.current++,
      data: taskData,
      status: "queued",
    };
    setTasks((prev) => [...prev, newTask]);
    setTotalTasks((prev) => prev + 1);
  };

  // Process tasks during idle time
  const processTaskQueue = (deadline) => {
    while (
      (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
      tasks.some((task) => task.status === "queued")
    ) {
      setTasks((prev) => {
        const queuedTaskIndex = prev.findIndex(
          (task) => task.status === "queued"
        );
        if (queuedTaskIndex === -1) return prev;

        const updatedTasks = [...prev];
        updatedTasks[queuedTaskIndex] = {
          ...updatedTasks[queuedTaskIndex],
          status: "processing",
        };

        // Simulate task processing
        setTimeout(() => {
          setTasks((current) => {
            const processingTasks = [...current];
            processingTasks[queuedTaskIndex] = {
              ...processingTasks[queuedTaskIndex],
              status: "completed",
            };
            return processingTasks;
          });
          setCompletedTasks((prev) => prev + 1);
        }, Math.random() * 1000 + 500);

        return updatedTasks;
      });
    }

    // Continue processing if there are more tasks
    if (tasks.some((task) => task.status === "queued")) {
      requestIdleCallback(processTaskQueue, { timeout: 1000 });
    } else {
      setIsRunning(false);
    }
  };

  const startProcessing = () => {
    if (!isRunning && tasks.some((task) => task.status === "queued")) {
      setIsRunning(true);
      requestIdleCallback(processTaskQueue, { timeout: 1000 });
    }
  };

  const addTasks = () => {
    const numTasks = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numTasks; i++) {
      enqueueTask({
        name: `Task ${taskIdRef.current}`,
        type: "background-processing",
        duration: Math.random() * 2000 + 500,
      });
    }
  };

  const clearTasks = () => {
    setTasks([]);
    setTotalTasks(0);
    setCompletedTasks(0);
    setIsRunning(false);
  };
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Background Tasks API
          </h2>
          <p className="text-purple-200 mt-2 text-lg">
            Uses requestIdleCallback() to process tasks during browser idle time
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <span className="text-xl">←</span>
            Back to Home
          </button>
        )}
      </div>{" "}
      <div className="flex gap-4 mb-8">
        <button
          onClick={addTasks}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add Tasks
        </button>
        <button
          onClick={startProcessing}
          disabled={
            isRunning || !tasks.some((task) => task.status === "queued")
          }
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {isRunning ? "Processing..." : "Start Processing"}
        </button>
        <button
          onClick={clearTasks}
          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Clear Tasks
        </button>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Progress: {completedTasks} / {totalTasks}
          </span>
          <span>
            {totalTasks > 0
              ? Math.round((completedTasks / totalTasks) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
              }%`,
            }}
          />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-3 mb-2 rounded-lg ${
              task.status === "completed"
                ? "bg-green-100 text-green-800"
                : task.status === "processing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <span>{task.data.name}</span>
            <span className="text-sm font-medium">
              {task.status === "completed"
                ? "✓ Done"
                : task.status === "processing"
                ? "⏳ Processing"
                : "⏸ Queued"}
            </span>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No tasks in queue. Click "Add Tasks" to create some background
            tasks.
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundTasksDemo;
