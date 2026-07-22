@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

body {
  font-family: var(--font-sans);
  background-color: #030712;
  color: #f3f4f6;
  overflow-x: hidden;
}

/* Custom scrollbar for modern fintech look */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #030712;
}

::-webkit-scrollbar-thumb {
  background: #1f2937;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #374151;
}

/* Subtle glow animations for real-time tickers */
@keyframes pulse-emerald {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
    box-shadow: 0 0 8px 2px rgba(16, 185, 129, 0.4);
  }
}

.animate-pulse-emerald {
  animation: pulse-emerald 2s infinite;
}
