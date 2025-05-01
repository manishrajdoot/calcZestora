const display = document.getElementById('display');
const historyContainer = document.getElementById('history');
const keys = document.querySelector('.calculator__keys');
const themeToggleBtn = document.getElementById('theme-toggle');
const soundToggleBtn = document.getElementById('sound-toggle');
const calculator = document.querySelector('.calculator');

let currentOperand = '0';
let previousOperand = '';
let operation = null;
let displayNeedsReset = false;
let memory = 0;
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
let audioContext = null;

// Initialize AudioContext on first user interaction
function initializeAudioContext() {
    if (audioContext) return;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed successfully');
            }).catch(err => {
                console.error('Failed to resume AudioContext:', err);
            });
        }
        console.log('AudioContext initialized:', audioContext.state);
    } catch (e) {
        console.error('AudioContext not supported:', e);
        soundEnabled = false;
    }
}

function playClickSound() {
    if (!soundEnabled || !audioContext) {
        console.log('Sound not played: soundEnabled=', soundEnabled, 'audioContext=', audioContext);
        return;
    }
    try {
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed for playback');
            });
        }
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        console.log('Click sound played');
    } catch (e) {
        console.error('Error playing sound:', e);
    }
}

function updateDisplay() {
    if (!display) return;
    const maxLength = 10;
    let displayValue = currentOperand;

    if (displayValue === 'Error') {
        display.textContent = 'Error';
        return;
    }

    const num = parseFloat(displayValue);
    if (!isNaN(num) && displayValue.length > maxLength) {
        displayValue = num.toExponential(4).replace(/\.?0+e/, 'e');
    } else if (displayValue.length > maxLength) {
        displayValue = displayValue.substring(0, maxLength);
    }

    display.textContent = displayValue;
    display.style.fontSize = displayValue.length > 8 ? '1.8em' : '2.5em';
}

function updateHistory() {
    if (!historyContainer) return;
    historyContainer.innerHTML = '';
    history.slice(-5).forEach((entry, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = entry.expression;
        historyItem.setAttribute('aria-label', `Recall result ${entry.result}`);
        historyItem.tabIndex = 0;
        historyItem.addEventListener('click', () => {
            currentOperand = entry.result.toString();
            displayNeedsReset = true;
            updateDisplay();
            playClickSound();
        });
        historyItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                currentOperand = entry.result.toString();
                displayNeedsReset = true;
                updateDisplay();
                playClickSound();
            }
        });
        historyContainer.appendChild(historyItem);
    });
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    displayNeedsReset = false;
    memory = 0;
    updateDisplay();
}

function deleteDigit() {
    if (displayNeedsReset || currentOperand === 'Error') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function appendNumber(number) {
    if (currentOperand === 'Error') return;
    if (currentOperand === '0' || displayNeedsReset) {
        currentOperand = number;
        displayNeedsReset = false;
    } else {
        if (currentOperand.length >= 15) return;
        currentOperand += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (currentOperand === 'Error') return;
    if (displayNeedsReset) {
        currentOperand = '0.';
        displayNeedsReset = false;
    } else if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === 'Error') return;
    if (currentOperand === '' && previousOperand !== '') {
        operation = selectedOperation;
        display.textContent = `${previousOperand} ${selectedOperation}`;
        console.log('Operation selected:', previousOperand, selectedOperation);
        return;
    }
    if (previousOperand !== '') {
        calculate();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
    displayNeedsReset = true;
    display.textContent = `${previousOperand} ${operation}`;
    console.log('Operation set:', previousOperand, operation);
}

function calculate() {
    if (currentOperand === 'Error' || operation === null || previousOperand === '') return;

    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) {
        currentOperand = 'Error';
        updateDisplay();
        return;
    }

    const operatorSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    if (result === 'Error') {
        currentOperand = 'Error';
    } else {
        result = Math.round(result * 100000000) / 100000000;
        currentOperand = result.toString();
        history.push({
            expression: `${prev} ${operatorSymbols[operation]} ${current} = ${result}`,
            result
        });
        updateHistory();
    }

    operation = null;
    previousOperand = '';
    displayNeedsReset = true;
    updateDisplay();
}

function memoryAdd() {
    if (currentOperand === 'Error' || isNaN(parseFloat(currentOperand))) {
        console.log('Cannot add to memory: currentOperand is', currentOperand);
        return;
    }
    const value = parseFloat(currentOperand);
    memory += value;
    console.log('Memory added:', value, 'New memory value:', memory);
}

function memorySubtract() {
    if (currentOperand === 'Error' || isNaN(parseFloat(currentOperand))) {
        console.log('Cannot subtract from memory: currentOperand is', currentOperand);
        return;
    }
    const value = parseFloat(currentOperand);
    memory -= value;
    console.log('Memory subtracted:', value, 'New memory value:', memory);
}

function memoryRecall() {
    if (currentOperand === 'Error') {
        console.log('Cannot recall memory: currentOperand is Error');
        return;
    }
    currentOperand = memory.toString();
    displayNeedsReset = true;
    updateDisplay();
    console.log('Memory recalled:', memory);
}

function memoryClear() {
    memory = 0;
    console.log('Memory cleared, new value:', memory);
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function vibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

if (keys) {
    keys.addEventListener('click', (event) => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) return;

        initializeAudioContext();
        createRipple(event);
        vibrate();
        playClickSound();

        switch (true) {
            case target.classList.contains('number'):
                if (value === '.') appendDecimal();
                else appendNumber(value);
                break;
            case target.classList.contains('operator'):
                chooseOperation(value);
                break;
            case target.classList.contains('equals'):
                calculate();
                break;
            case target.classList.contains('function'):
                if (value === 'clear') clear();
                else if (value === 'delete') deleteDigit();
                else if (value === 'mc') memoryClear();
                else if (value === 'mr') memoryRecall();
                else if (value === 'm+') memoryAdd();
                else if (value === 'm-') memorySubtract();
                break;
        }
    });
}

document.addEventListener('keydown', (event) => {
    const { key } = event;

    if (['+', '-', '*', '/', 'Enter', 'Backspace', 'Escape', '.'].includes(key)) {
        event.preventDefault();
    }

    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
        initializeAudioContext();
        playClickSound();
    } else if (['+', '-', '*', '/'].includes(key)) {
        const operatorMap = { '/': '/', '*': '*', '-': '-', '+': '+' };
        chooseOperation(operatorMap[key]);
        initializeAudioContext();
        playClickSound();
    } else if (key === '.') {
        appendDecimal();
        initializeAudioContext();
        playClickSound();
    } else if (key === 'Enter') {
        calculate();
        initializeAudioContext();
        playClickSound();
    } else if (key === 'Escape') {
        clear();
        initializeAudioContext();
        playClickSound();
    } else if (key === 'Backspace') {
        deleteDigit();
        initializeAudioContext();
        playClickSound();
    }
});

function setTheme(theme) {
    if (!document.documentElement || !themeToggleBtn || !calculator) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    calculator.classList.add('theme-transition');
    setTimeout(() => calculator.classList.remove('theme-transition'), 300);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (event) => {
        initializeAudioContext();
        createRipple(event);
        vibrate();
        playClickSound();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (event) => {
        initializeAudioContext();
        createRipple(event);
        vibrate();
        playClickSound();
        soundEnabled = !soundEnabled;
        soundToggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
        soundToggleBtn.setAttribute('aria-label', `Toggle sound effects ${soundEnabled ? 'off' : 'on'}`);
        localStorage.setItem('soundEnabled', soundEnabled);
    });
}

function loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

loadTheme();
if (soundToggleBtn) {
    soundToggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
}
updateDisplay();
updateHistory();