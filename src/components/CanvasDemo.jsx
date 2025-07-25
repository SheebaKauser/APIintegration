import { useState, useRef, useEffect } from "react";

const CanvasDemo = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#3B82F6");
  const [brushSize, setBrushSize] = useState(5);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);
    }
  }, []);

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "brush") {
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "brush") {
      const ctx = canvas.getContext("2d");
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawShape = (shapeType) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 50;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    switch (shapeType) {
      case "circle":
        ctx.beginPath();
        ctx.arc(
          centerX + Math.random() * 100 - 50,
          centerY + Math.random() * 100 - 50,
          size,
          0,
          2 * Math.PI
        );
        ctx.fill();
        break;
      case "rectangle":
        ctx.fillRect(
          centerX + Math.random() * 100 - 50,
          centerY + Math.random() * 100 - 50,
          size * 2,
          size
        );
        break;
      case "triangle":
        const x = centerX + Math.random() * 100 - 50;
        const y = centerY + Math.random() * 100 - 50;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x - size, y + size);
        ctx.closePath();
        ctx.fill();
        break;
    }

    setShapes((prev) => [
      ...prev,
      { type: shapeType, color, timestamp: Date.now() },
    ]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    setShapes([]);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "canvas-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Canvas API</h2>
          <p className="text-gray-600 mt-1">
            Interactive drawing canvas with shapes and brush tools
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

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Tool:</label>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="brush">Brush</option>
            <option value="shapes">Shapes</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
        </div>

        {tool === "brush" && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-sm">{brushSize}px</span>
          </div>
        )}
      </div>

      {tool === "shapes" && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => drawShape("circle")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
          >
            Circle
          </button>
          <button
            onClick={() => drawShape("rectangle")}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
          >
            Rectangle
          </button>
          <button
            onClick={() => drawShape("triangle")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition-colors"
          >
            Triangle
          </button>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={clearCanvas}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Clear Canvas
        </button>
        <button
          onClick={downloadCanvas}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Download
        </button>
      </div>

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={tool === "brush" ? startDrawing : undefined}
          onMouseMove={tool === "brush" ? draw : undefined}
          onMouseUp={tool === "brush" ? stopDrawing : undefined}
          onMouseLeave={tool === "brush" ? stopDrawing : undefined}
          className="cursor-crosshair bg-white"
        />
      </div>

      {shapes.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Shapes drawn: {shapes.length}
          </p>
          <div className="text-xs text-gray-500">
            Last shape: {shapes[shapes.length - 1]?.type} at{" "}
            {new Date(
              shapes[shapes.length - 1]?.timestamp
            ).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasDemo;
