#!/bin/bash

# Create a backup
cp client/src/pages/EcommercePage.tsx client/src/pages/EcommercePage.tsx.bak

# Replace the first FAQ card styling
sed -i '/className="bg-\[#111119\] border-white\/10 text-white overflow-hidden relative group hover:shadow-xl transition-all duration-300"/c\                className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${\n                  theme === '\''dark'\''\n                    ? '\''bg-[#111119] border-white/10 text-white'\''\n                    : '\''bg-white border-slate-200 shadow-sm text-slate-800'\''\n                }`}' client/src/pages/EcommercePage.tsx

# Replace all the gradient style in the cards
sed -i 's/background: '\''radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 87, 34, 0.2) 0%, rgba(255, 87, 34, 0.05) 25%, transparent 70%)'\'',/background: theme === '\''dark'\''\n                      ? '\''radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 87, 34, 0.2) 0%, rgba(255, 87, 34, 0.05) 25%, transparent 70%)'\''\n                      : '\''radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 87, 34, 0.15) 0%, rgba(255, 87, 34, 0.05) 25%, transparent 70%)'\'',/g' client/src/pages/EcommercePage.tsx

# Replace all the mixBlendMode in the cards
sed -i 's/mixBlendMode: '\''soft-light'\'',/mixBlendMode: theme === '\''dark'\''\n                      ? '\''soft-light'\''\n                      : '\''multiply'\'',/g' client/src/pages/EcommercePage.tsx

# Print result
echo "Fixed dark cards in EcommercePage.tsx"
