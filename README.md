# 金融大冒險 (Financial Adventure)

An interactive web application that teaches financial literacy through engaging stories and hands-on demonstrations. Learn about interest, compound interest, fixed deposits, stocks, bonds, and futures in a fun, interactive way.

## 🌟 Features

### Interactive Learning Modules
- **Welcome Slide** - Introduction to the financial adventure
- **Interest (利息)** - Learn the basics of interest with an interactive calculator
- **Compound Interest (複利)** - Visualize the power of compound interest vs simple interest
- **Fixed Deposit (定存)** - Understand low-risk savings
- **Stocks (股票)** - Experience stock ownership through a simulated "珍奶店" (bubble tea shop)
- **Bonds (債券)** - Learn about fixed-income investments
- **Futures (期貨)** - Explore leverage and risk with an interactive slider

### User Experience
- **Theme Toggle** - Switch between light and dark modes
- **Progress Bar** - Track your learning progress across 8 slides
- **Interactive Demos** - Hands-on calculators and simulators
- **Navigation Controls** - Easy next/previous slide navigation

## 🛠 Tech Stack

- **React** 19.0.0 - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** 6.0.0 - Build tool and dev server
- **Tailwind CSS** 4.0.0 - Utility-first CSS framework
- **Lucide React** - Icon library

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd financial-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown (typically `http://localhost:5173`)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the production-optimized bundle |
| `npm run preview` | Preview the production build locally |

## 📁 Project Structure

```
financial-game/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── main.tsx            # React app entry point
    ├── App.tsx             # Main application component
    └── index.css           # Global styles
```

## 🎨 Design System

### Typography
- **Andika** - Primary font
- **jf-openhuninn (粉圓體)** - Taiwanese font for Chinese text

### Color Scheme
- **Primary**: Pink (#ec4899), Cyan (#06b6d4)
- **Light Mode**: Cream background (#FFFBEB)
- **Dark Mode**: Slate (#0f172a) with pink accents

### Visual Effects
- Hard shadows for a playful, retro feel
- Smooth transitions and animations
- Hover and active states on interactive elements

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)

## 🔧 Customization

### Adding New Slides

To add a new educational slide:

1. Import your icons from `lucide-react`
2. Create a new slide component function
3. Add it to the `slides` array in `App.tsx`

```tsx
function SlideNewTopic() {
  return (
    <div>
      {/* Your slide content */}
    </div>
  );
}

// Add to slides array
const slides = [
  // ... existing slides
  <SlideNewTopic key="new-topic" />,
];
```

### Theme Customization

The app supports both light and dark themes. Theme colors are defined using Tailwind CSS classes:
- Light: `bg-[#FFFBEB]`, `text-slate-900`
- Dark: `bg-slate-900`, `text-slate-100`

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [Lucide React](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the excellent development experience
