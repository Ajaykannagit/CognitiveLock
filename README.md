# 🔐 Cognitive-Lock Notes

A modern, interactive web application that transforms your notes into algorithmic puzzles using position-based encryption. Your notes are encrypted by position and become visible only when you solve them through proximity-based interaction.

![Cognitive-Lock Notes](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

## ✨ Features

### 🔒 Position-Based Encryption
- Each character is shifted by its position in the message
- 1st letter = +1 shift, 2nd = +2 shift, creating unique encryption per message
- Reversed character order for additional obfuscation
- Right-to-left display with vertical flip transformation

### 🎯 Interactive Decryption
- **Hover-based unlock**: Get close to the encrypted text to reveal it
- **Proximity detection**: Real-time distance calculation for smooth reveal
- **Visual feedback**: Animated transitions with blur effects
- **Dual view**: See both encrypted and decrypted states side by side

### 💾 Data Management
- **Auto-save**: Notes automatically save to browser localStorage
- **Export/Import**: Save notes as JSON files with metadata
- **Statistics**: Real-time character count, word count, and encryption status
- **Persistent Storage**: Notes survive page refreshes

### ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + K` - Toggle lock/unlock
- `Ctrl/Cmd + Shift + C` - Copy encrypted text
- `Ctrl/Cmd + Shift + V` - Paste and decrypt encrypted text
- `Esc` - Re-lock the message

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds with animated effects
- Smooth transitions and animations
- Responsive design for all screen sizes
- Dark theme optimized for focus
- Glassmorphism effects with backdrop blur
- Toast notifications for user feedback
- Interactive statistics panel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cognitive-lock-notes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📖 How It Works

### Encryption Algorithm

1. **Character Reversal**: The input text is reversed character by character
2. **Position-Based Caesar Cipher**: Each alphabetic character is shifted by its position index
   - Position 1: +1 shift
   - Position 2: +2 shift
   - Position 3: +3 shift
   - ...and so on
3. **Visual Transformation**: 
   - Right-to-left (RTL) text direction
   - Vertical flip (scaleY(-1))
   - Blur effect when locked

### Decryption Process

1. **Proximity Detection**: Mouse position is tracked relative to the encrypted text container
2. **Distance Calculation**: Euclidean distance determines unlock strength
3. **Gradual Reveal**: As proximity increases, blur decreases and text becomes readable
4. **Full Unlock**: When proximity threshold is met, text fully decrypts with animation

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Styling
- **Lucide React** - Icon library
- **PostCSS** - CSS processing

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Landing section
│   │   ├── InteractiveDemo.tsx    # Main encryption/decryption demo
│   │   ├── ConceptShowcase.tsx    # Feature explanations
│   │   └── Footer.tsx             # Footer component
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎯 Use Cases

- **Personal Note-Taking**: Keep your notes visually private
- **Brain Training**: Exercise your cognitive skills with encryption puzzles
- **Creative Projects**: Add an interactive encryption element to your apps
- **Educational Tool**: Learn about position-based ciphers and encryption concepts
- **Fun & Games**: Challenge friends to decrypt your messages

## ⚠️ Security Note

This is a **visual obfuscation tool** designed for fun and creativity, not cryptographic security. The encryption is:
- **Not cryptographically secure** - It's a simple positional cipher
- **For entertainment purposes** - Perfect for brain-teasing experiences
- **Easily reversible** - Anyone who understands the algorithm can decrypt

For real security needs, use proper cryptographic libraries and methods.

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#06b6d4', // cyan
      'secondary': '#3b82f6', // blue
    }
  }
}
```

### Adjusting Encryption

Modify the `transformText` and `reverseTransformText` functions in `InteractiveDemo.tsx` to change the encryption algorithm.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cognitive-lock-notes)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/cognitive-lock-notes)

### Manual Deployment

1. Build the project: `npm run build`
2. The `dist` folder contains the production-ready files
3. Upload the `dist` folder contents to your hosting provider

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐!

---

**Made with ❤️ for creative note-taking and cognitive challenges**

