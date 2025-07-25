# Web APIs Integration Demo

A comprehensive React application showcasing modern Web APIs with interactive examples and beautiful Tailwind CSS styling.

## Featured APIs

### 🏃‍♂️ Background Tasks API

- Uses `requestIdleCallback()` to process tasks during browser idle time
- Demonstrates cooperative task scheduling
- Shows progress tracking and queue management

### 🎨 Canvas API

- Interactive drawing canvas with brush and shape tools
- Real-time drawing with mouse events
- Color picker and brush size controls
- Download functionality for created artwork

### 📍 Geolocation API

- Get current device location
- Watch position changes in real-time
- Location history tracking with distance calculations
- Handles permissions and error states

### 👁️ Intersection Observer API

- Monitor element visibility as you scroll
- Configurable threshold and root margin settings
- Visual feedback for intersecting elements
- Performance-optimized visibility detection

### 📶 Network Information API

- Monitor connection quality and type
- Adaptive content based on network speed
- Connection history tracking
- Data saver mode detection

## Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Modern Web APIs** - Latest browser capabilities

## Getting Started

### Prerequisites

- Node.js 16+
- Modern browser (Chrome recommended for full API support)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd APIintegration
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Browser Support

| API                   | Chrome | Firefox | Safari | Edge |
| --------------------- | ------ | ------- | ------ | ---- |
| Background Tasks      | ✅     | ✅      | ❌     | ✅   |
| Canvas                | ✅     | ✅      | ✅     | ✅   |
| Geolocation           | ✅     | ✅      | ✅     | ✅   |
| Intersection Observer | ✅     | ✅      | ✅     | ✅   |
| Network Information   | ✅     | ❌      | ❌     | ✅   |

## Features

- 📱 **Responsive Design** - Works on desktop and mobile
- 🎯 **Interactive Examples** - Hands-on API demonstrations
- 📊 **Real-time Updates** - Live data and state changes
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 📖 **Educational** - Learn through practical examples

## Project Structure

```
src/
├── components/           # Individual API demo components
│   ├── BackgroundTasksDemo.jsx
│   ├── CanvasDemo.jsx
│   ├── GeolocationDemo.jsx
│   ├── IntersectionObserverDemo.jsx
│   └── NetworkInformationDemo.jsx
├── App.jsx              # Main application component
├── main.jsx             # Entry point
└── index.css            # Tailwind CSS imports
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New APIs

1. Create a new component in `src/components/`
2. Add the component to the demos array in `App.jsx`
3. Include appropriate browser support information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across browsers
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Resources

- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
