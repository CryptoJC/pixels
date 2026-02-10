# Random Pixel Filler

An interactive React application that fills a 1000×1000 pixel canvas with randomly colored pixels at random coordinates.

![Random Pixel Filler Demo](demo-screenshot.png)

## Features

- 🎨 **Random Color Generation**: Each pixel is filled with a unique random RGB color
- 🎯 **Random Coordinates**: Generates random X and Y coordinates (0-999) for pixel placement
- 📊 **Progress Tracking**: Real-time display of pixels filled and completion percentage
- ⚡ **Adjustable Speed**: Control the filling speed from 1x to 1000x
- 🎮 **Interactive Controls**: Start, Pause, Resume, and Reset functionality
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Smart Algorithm**: Efficiently handles pixel placement even as the canvas fills up

## How It Works

1. The app generates two random numbers between 0 and 999 for X and Y coordinates
2. It plots a pixel with a random RGB color at that location on the canvas
3. The process continues, tracking filled pixels to avoid duplicates
4. When all 1,000,000 pixels are filled, the process automatically stops

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/random-pixel-filler.git
cd random-pixel-filler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Click **Start** to begin filling the canvas with random pixels
2. Use the **speed slider** to adjust how fast pixels are added
3. Click **Pause** to temporarily stop the process
4. Click **Resume** to continue from where you paused
5. Click **Reset** to clear the canvas and start over

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `build` folder, ready for deployment.

## Technologies Used

- React 18
- HTML5 Canvas
- Tailwind CSS (via CDN)
- JavaScript ES6+

## Performance Notes

- The app uses a Set data structure to track filled pixels efficiently
- When random coordinate generation becomes inefficient (too many collisions), it switches to a scanning algorithm
- Multiple pixels can be rendered per frame based on the speed setting
- Uses `requestAnimationFrame` for smooth animations

## License

MIT License - feel free to use this project for learning or personal use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created with ❤️ using React and Canvas API
