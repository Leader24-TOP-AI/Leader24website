const fs = require('fs');

// Leggi il file
const filePath = 'client/src/pages/EcommercePage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Trova tutte le occorrenze del container dell'integrazione e sostituiscile
let newContent = content.replace(
  /className="rounded-lg p-4 border border-white\/10 overflow-hidden relative group hover:shadow-xl transition-all duration-300"\s+style={{\s+background: 'linear-gradient\(135deg, rgba\(255, 87, 34, 0.05\), rgba\(0, 0, 0, 0\)\)',/g,
  `className={\`rounded-lg p-4 overflow-hidden relative group hover:shadow-xl transition-all duration-300 \${
    theme === 'dark' 
      ? 'border border-white/10' 
      : 'border border-slate-200'
  }\`}
                      style={{
                        background: theme === 'dark'
                          ? 'linear-gradient(135deg, rgba(255, 87, 34, 0.05), rgba(0, 0, 0, 0))'
                          : 'linear-gradient(135deg, rgba(255, 87, 34, 0.03), rgba(255, 255, 255, 0))',`
);

// Scrivi il file modificato
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('File modificato con successo');
