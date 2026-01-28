# Interactive Particle Animation

A mesmerizing, fully customizable particle animation system built with React and HTML5 Canvas. Features real-time mouse interaction, dynamic connections, and extensive customization options.

## Features

### Particle Physics
- **Natural Movement**: Particles move with realistic velocity and bounce off boundaries
- **Mouse Interaction**: Particles react and flee from cursor movement
- **Dynamic Connections**: Particles connect with lines when within range
- **Smooth Performance**: 60 FPS animations with optimized rendering
- **Collision Detection**: Particles stay within canvas boundaries

### Visual Customization
- **6 Color Schemes**: Blue, Purple, Green, Red, Rainbow, White
- **Particle Count**: Adjust from 10 to 300 particles
- **Particle Size**: Scale from 1px to 10px
- **Speed Control**: Adjust velocity from 0.1x to 3x
- **Connection Distance**: Control how far particles connect (50-300px)
- **Mouse Effect Radius**: Adjust interaction range (50-400px)

### Interactive Controls
- **Play/Pause**: Control animation playback
- **Reset**: Regenerate all particles
- **Settings Panel**: Real-time adjustments with instant feedback
- **Toggle Features**: Enable/disable connections and mouse interaction
- **Click Outside to Close**: Settings panel closes when clicking background

### Quick Presets
- **Default**: Balanced, smooth particle movement
- **Chaos**: 300 fast-moving particles with tight connections
- **Calm**: Slow, peaceful movement with long connections
- **Matrix**: Green particles with Matrix-inspired aesthetics

## Technologies Used

- **React**: Component-based UI framework
- **HTML5 Canvas**: High-performance 2D rendering
- **JavaScript**: Particle physics and animation logic
- **Tailwind CSS**: Modern styling and UI components
- **Lucide React**: Clean, minimal icons
- **RequestAnimationFrame**: Smooth 60fps animations

## How to Run

### Installation
```bash
# Install dependencies
npm install

# Run the app
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Usage Guide

### Basic Interaction
1. **Move your mouse** across the canvas to interact with particles
2. **Particles will flee** from your cursor within the effect radius
3. **Watch connections form** between nearby particles
4. **Hover to see** real-time particle reactions

### Controls
- **Play/Pause Button**: Freeze or resume animation
- **Reset Button**: Regenerate particles in random positions
- **Settings Button**: Open customization panel

### Customization
1. Click the **Settings** button (gear icon)
2. Adjust sliders for real-time changes:
   - **Particle Count**: More particles = denser animation
   - **Particle Size**: Larger = more visible, smaller = subtle
   - **Speed**: Faster = chaotic, slower = peaceful
   - **Connection Distance**: Larger = more connections
   - **Mouse Radius**: Larger = wider interaction area
3. Choose a **color scheme** to change the theme
4. Toggle **connections** or **mouse interaction** on/off
5. Try **quick presets** for instant configurations

### Color Schemes
- **Blue**: Cool, tech-focused aesthetic
- **Purple**: Modern, vibrant feel
- **Green**: Matrix-inspired, cyberpunk
- **Red**: Bold, energetic atmosphere
- **Rainbow**: Dynamic, constantly shifting hues
- **White**: Clean, minimal appearance

## Technical Details

### Particle Class
Each particle has:
- Position (x, y coordinates)
- Velocity (vx, vy)
- Size
- Hue (for rainbow mode)

### Physics Simulation
- Particles move with constant velocity
- Bounce off canvas boundaries
- React to mouse proximity with repulsion force
- Speed limiting prevents runaway acceleration
- Distance calculations for connection rendering

### Optimization
- Canvas clearing with semi-transparent overlay for trail effect
- Efficient distance calculations
- RequestAnimationFrame for smooth 60fps
- Conditional rendering of connections
- Event delegation for mouse tracking

## Configuration Options

| Setting | Min | Max | Default | Description |
|---------|-----|-----|---------|-------------|
| Particle Count | 10 | 300 | 100 | Number of particles |
| Particle Size | 1 | 10 | 3 | Size in pixels |
| Speed | 0.1 | 3.0 | 1.0 | Movement multiplier |
| Connection Distance | 50 | 300 | 150 | Max line distance |
| Mouse Radius | 50 | 400 | 200 | Interaction range |

## Project Structure
```
particle-animation/
├── src/
│   ├── App.js          # Main particle animation component
│   └── index.js        # Entry point
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Performance

- Optimized for 60 FPS on modern browsers
- Handles up to 300 particles smoothly
- Responsive canvas resizing
- Efficient particle-to-particle distance calculations
- Hardware-accelerated Canvas rendering

## Browser Compatibility

Works on all modern browsers supporting:
- HTML5 Canvas
- RequestAnimationFrame
- ES6+ JavaScript

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Use Cases

Perfect for:
- **Portfolio Backgrounds**: Eye-catching hero sections
- **Loading Screens**: Engaging wait experiences
- **Interactive Installations**: Art and design projects
- **Data Visualization**: Particle-based representations
- **Educational Demos**: Physics and animation concepts
- **Creative Coding**: Generative art projects

## Customization Tips

### For Subtle Background
- Low particle count (30-50)
- Small particle size (2-3px)
- Slow speed (0.3-0.5x)
- Light colors (white, light blue)
- Disable mouse interaction

### For Dynamic Showcase
- High particle count (200-300)
- Medium particle size (4-6px)
- Fast speed (1.5-2x)
- Vibrant colors (rainbow, purple)
- Enable all interactions

### For Performance
- Keep particle count under 150
- Disable connections if not needed
- Use solid colors (not rainbow)
- Reduce connection distance

## Future Enhancements

Potential features for future versions:
- Particle trails/fading
- Gravity and attraction modes
- Click-to-spawn particles
- Export animation as GIF/video
- Custom particle shapes
- Sound reactivity
- Multi-touch support for mobile
- Particle collision physics
- Predefined animation patterns
- Keyboard controls

## Known Limitations

- Performance may vary on older devices with 300+ particles
- Mobile touch interaction not optimized
- Rainbow mode slightly more CPU-intensive
- Very large mouse radius may impact performance

## Author

Built as a portfolio project to demonstrate:
- Canvas animation techniques
- JavaScript physics simulation
- React state management
- Real-time user interaction
- Performance optimization
- Creative coding skills

## Inspiration

Inspired by particle.js, interactive backgrounds, and generative art. Redesigned with focus on customization and real-time interaction.

## License

This project is open source and available for educational and personal use.

## Screenshots

*Add screenshots showing different presets and color schemes*

## Live Demo

*Add link to deployed version if hosted*
```

---

## GitHub Naming Guide

### Repository Name
```
interactive-particle-animation
```
or
```
particle-system-react
```

### File Names

**Main Component:**
```
src/App.js
