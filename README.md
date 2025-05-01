CalcZestora
A modern, neumorphic-styled calculator web application with advanced features, designed for both desktop and mobile users. CalcZestora provides a sleek user interface, sound effects, and offline support via Progressive Web App (PWA) functionality.
Features

Neumorphic Design: A visually appealing, soft UI with light and dark theme support.
Basic Operations: Perform addition (+), subtraction (-), multiplication (×), and division (÷).
Memory Functions: Use MC (Memory Clear), MR (Memory Recall), M+ (Memory Add), and M- (Memory Subtract) for advanced calculations.
Interactive Display: Shows operation signs (e.g., 5 +) as you type or click.
Sound Effects: Click or type to hear a subtle sound (toggleable with the sound button 🔊/🔇).
History Tracking: Displays the last 5 calculations, clickable to recall results.
Theme Toggle: Switch between light (☀️) and dark (🌙) modes, with automatic system preference detection.
Progressive Web App (PWA): Installable on devices with offline support.
Responsive Design: Works seamlessly on desktop, tablet, and mobile devices.
Keyboard Support: Use your keyboard to perform calculations with sound feedback.
Accessibility: Includes ARIA labels and focus styles for better usability.

Installation

Clone the Repository:
git clone https://github.com/your-username/calcZestora.git

Replace your-username with your GitHub username.

Navigate to the Project Directory:
cd calcZestora


Serve the Application:Since this is a static web app, you need to serve it over HTTPS or localhost for PWA features to work. Use a local server like http-server:
npx http-server -c-1 --ssl

Alternatively, use VS Code’s Live Server extension or any other local server.

Open in Browser:Open your browser and navigate to the URL provided by the server (e.g., https://localhost:8080).


Usage

Perform Calculations:
Click the buttons or use your keyboard to input numbers and operators.
Example: Type 5, +, 3, then = to get 8.


Memory Functions:
MC: Clear the memory.
MR: Recall the stored memory value.
M+: Add the current value to memory.
M-: Subtract the current value from memory.


Toggle Theme: Click the theme button (🌙/☀️) to switch between light and dark modes.
Toggle Sound: Click the sound button (🔊/🔇) to enable or disable sound effects.
View History: Scroll through the history panel to see past calculations and click to recall results.
Install as PWA: Use the browser’s "Install" option to add CalcZestora to your device for offline use.

Technologies Used

HTML5: Structure of the web application.
CSS3: Styling with neumorphic design, responsive layouts, and theme switching.
JavaScript: Core logic for calculator operations, sound effects, and PWA functionality.
Web APIs:
AudioContext for sound effects.
Service Worker for offline support.
LocalStorage for theme and history persistence.


Fonts: Montserrat from Google Fonts for typography.

Project Structure
calcZestora/
├── index.html         # Main HTML file
├── style.css          # Stylesheet for neumorphic design and themes
├── script.js          # JavaScript logic for calculator functionality
├── manifest.json      # PWA manifest for app installation
├── service-worker.js  # Service Worker for offline support
└── README.md          # Project documentation

Developer
Developed by Manish Rajdoot © 2025.
License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.

Happy calculating with CalcZestora! 🧮
