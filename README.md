# CalcZestora 🧮

![GitHub stars](https://img.shields.io/github/stars/manishrajdoot/calcZestora?style=social) ![GitHub forks](https://img.shields.io/github/forks/manishrajdoot/calcZestora?style=social) ![License](https://img.shields.io/github/license/manishrajdoot/calcZestora)

CalcZestora is a modern, neumorphic-styled calculator web application designed for seamless calculations on both desktop and mobile devices. With a sleek interface, sound effects, and offline support via Progressive Web App (PWA) functionality, it offers an enhanced user experience for performing basic arithmetic operations and more.

## ✨ Features

- **Neumorphic Design**: Soft, modern UI with light and dark theme support for a visually appealing experience.
- **Basic Operations**: Perform addition (`+`), subtraction (`-`), multiplication (`×`), and division (`÷`) effortlessly.
- **Memory Functions**: Utilize `MC` (Memory Clear), `MR` (Memory Recall), `M+` (Memory Add), and `M-` (Memory Subtract) for advanced calculations.
- **Interactive Display**: Shows operation signs in real-time (e.g., `5 +`) as you type or click.
- **Sound Effects**: Subtle click sounds on button press or keyboard input (toggleable with 🔊/🔇).
- **Calculation History**: View and recall the last 5 calculations with a single click.
- **Theme Toggle**: Switch between light (☀️) and dark (🌙) modes, with system preference detection.
- **Progressive Web App (PWA)**: Installable on devices with offline support.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Keyboard Support**: Full keyboard input support with sound feedback.
- **Accessibility**: ARIA labels and focus styles for better usability.

## 🌐 Live Demo

Try CalcZestora live at: [https://manishrajdoot.github.io/calcZestora](https://manishrajdoot.github.io/calcZestora)

*Note*: If the live demo link isn’t active, enable GitHub Pages in the repository settings (see "Enable GitHub Pages" under Installation).

## 📸 Screenshots

*No screenshots are displayed yet. Follow these steps to add them:*

1. Take screenshots of the calculator in different modes (e.g., light theme, dark theme, mobile view).
2. Create a `screenshots/` folder in the repository:
   - On GitHub, go to `https://github.com/manishrajdoot/calcZestora`, click **Add file** > **Create new file**, name it `screenshots/placeholder.txt`, and commit to create the folder.
   - Alternatively, create the folder locally and push it with Git.
3. Upload your images (e.g., `light-theme.png`, `dark-theme.png`) to the `screenshots/` folder:
   - Click **Add file** > **Upload files** on GitHub, or use `git add screenshots/*.png` locally.
4. Update this section with the image links. Replace the placeholders below with actual file names:
   - Light Theme: ![Light Theme](screenshots/light-theme.png)
   - Dark Theme: ![Dark Theme](screenshots/dark-theme.png)
   - Mobile View: ![Mobile View](screenshots/mobile-view.png)

*After uploading, the images will appear here. Refresh the page to see the changes.*

## 🚀 Getting Started

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Safari).
- A local server for testing (e.g., `http-server` for HTTPS/localhost, required for PWA features).

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/manishrajdoot/calcZestora.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd calcZestora
   ```
3. **Serve the Application**:
   Use a local HTTPS server to test the app (required for PWA and sound features):
   ```bash
   npx http-server -c-1 --ssl
   ```
   Alternatively, use VS Code’s Live Server extension or any other local server.
4. **Open in Browser**:
   Navigate to the URL provided by the server (e.g., `https://localhost:8080`).

### Enable GitHub Pages (Optional)
To host CalcZestora online:
1. Go to the repository on GitHub (`https://github.com/manishrajdoot/calcZestora`).
2. Navigate to **Settings** > **Pages**.
3. Under "Source," select the `main` branch and save.
4. Wait a few minutes, then access the live site at `https://manishrajdoot.github.io/calcZestora`.

## 🖱️ Usage

- **Perform Calculations**:
  - Click buttons or type numbers and operators using your keyboard.
  - Example: Type `5`, `+`, `3`, then `=` to get `8`.
- **Memory Functions**:
  - `MC`: Clear memory.
  - `MR`: Recall memory value.
  - `M+`: Add current value to memory.
  - `M-`: Subtract current value from memory.
- **Toggle Theme**: Click the theme button (🌙/☀️) to switch modes.
- **Toggle Sound**: Click the sound button (🔊/🔇) to enable/disable sound effects.
- **View History**: Check the history panel to see past calculations and click to recall.
- **Install as PWA**: Use your browser’s "Install" option to add CalcZestora to your device.

## 🛠️ Technologies Used

- **HTML5**: Core structure of the web app.
- **CSS3**: Neumorphic styling, responsive design, and theme switching.
- **JavaScript**: Calculator logic, sound effects, and PWA functionality.
- **Web APIs**:
  - `AudioContext`: For sound effects.
  - `Service Worker`: For offline support via PWA.
  - `LocalStorage`: For persisting theme and history data.
- **Fonts**: Montserrat (Google Fonts) for typography.

## 📂 Project Structure

```
calcZestora/
├── index.html         # Main HTML file
├── style.css          # Stylesheet for neumorphic design and themes
├── script.js          # JavaScript logic for calculator functionality
├── manifest.json      # PWA manifest for app installation
├── service-worker.js  # Service Worker for offline support
└── README.md          # Project documentation
├── screenshots/       # Folder for screenshots (to be added)
```

## 👨‍💻 Developer

Developed by [Manish Rajdoot](https://www.instagram.com/manish.rajdoot/) © 2025.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ❓ Troubleshooting

- **Images Not Appearing**:
  - For screenshots: Ensure you’ve uploaded images to the `screenshots/` folder and updated the links in the "Screenshots" section.
  - For favicon: The current favicon uses an emoji URL (`https://emojicdn.elk.sh/🧮?style=apple`). If it’s not displaying:
    1. Create a custom 192x192 PNG favicon (e.g., `favicon.png`).
    2. Replace the `<link rel="icon">` in `index.html` with `<link rel="icon" href="/favicon.png" type="image/png">`.
    3. Update the `icons` in `manifest.json` to reference the new file.
    4. Upload `favicon.png` to the repository root and commit the changes.

- **Live Demo Not Working**:
  - Ensure GitHub Pages is enabled (see "Enable GitHub Pages" above).
  - Clear your browser cache or try a different browser.

---

Happy calculating with CalcZestora! 🧮


---
