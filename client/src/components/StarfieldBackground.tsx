import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  size: 'small' | 'medium' | 'large';
  top: string;
  left: string;
  delay: string;
  duration: string;
  moveX: number; // Valore tra -1 e 1 per movimento orizzontale
  moveY: number; // Valore tra -1 e 1 per movimento verticale
  moveDuration: string; // Durata del movimento
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  angle: string;
}

interface Galaxy {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  hue: string;
}

interface StarfieldBackgroundProps {
  starsCount?: number;
  shootingStarsCount?: number;
  galaxiesCount?: number;
  children: React.ReactNode;
  className?: string;
}

export default function StarfieldBackground({
  starsCount = 100,
  shootingStarsCount = 3,
  galaxiesCount = 2,
  children,
  className = ''
}: StarfieldBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);

  useEffect(() => {
    // Generate stars with fluid movement
    const newStars: Star[] = [];
    for (let i = 0; i < starsCount; i++) {
      newStars.push({
        id: i,
        size: Math.random() < 0.6 ? 'small' : Math.random() < 0.8 ? 'medium' : 'large',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 3}s`,
        moveX: (Math.random() * 2 - 1) * 0.8, // Valore tra -0.8 e 0.8
        moveY: (Math.random() * 2 - 1) * 0.8, // Valore tra -0.8 e 0.8
        moveDuration: `${30 + Math.random() * 70}s` // Movimento molto lento (30-100s)
      });
    }
    setStars(newStars);

    // Generate shooting stars
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < shootingStarsCount; i++) {
      newShootingStars.push({
        id: i,
        top: `${Math.random() * 30}%`,
        left: `${Math.random() * 70}%`,
        delay: `${5 + Math.random() * 15}s`,
        duration: `${2 + Math.random() * 2}s`,
        angle: `${Math.random() * 45}deg`
      });
    }
    setShootingStars(newShootingStars);

    // Generate galaxies
    const newGalaxies: Galaxy[] = [];
    for (let i = 0; i < galaxiesCount; i++) {
      newGalaxies.push({
        id: i,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 70}%`,
        size: `${150 + Math.random() * 200}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${15 + Math.random() * 10}s`,
        hue: `${Math.random() < 0.5 ? 15 : 200}`  // Scegli tra arancione (15) o blu (200)
      });
    }
    setGalaxies(newGalaxies);
  }, [starsCount, shootingStarsCount, galaxiesCount]);

  // Effetto per avviare l'animazione delle stelle cadenti in modo casuale
  useEffect(() => {
    const shootingStarElements = document.querySelectorAll('.shooting-star');
    
    shootingStarElements.forEach((star, index) => {
      const triggerAnimation = () => {
        if (star instanceof HTMLElement) {
          star.style.opacity = '1';
          star.style.animationPlayState = 'running';
          
          setTimeout(() => {
            star.style.opacity = '0';
            star.style.animationPlayState = 'paused';
            
            // Programma la prossima animazione
            setTimeout(triggerAnimation, (10 + Math.random() * 20) * 1000);
          }, parseInt(shootingStars[index]?.duration || '3s') * 1000);
        }
      };
      
      // Avvia la prima animazione dopo un ritardo casuale
      setTimeout(triggerAnimation, (3 + Math.random() * 10) * 1000);
    });
  }, [shootingStars]);

  // Effetto per animare il movimento delle stelle nello spazio
  useEffect(() => {
    // Crea un'animazione per muovere le stelle
    const moveStars = () => {
      const starElements = document.querySelectorAll('.star');
      
      starElements.forEach((element, index) => {
        if (element instanceof HTMLElement && stars[index]) {
          const star = stars[index];
          
          // Usa una funzione di movimento sinusoidale per rendere più naturale
          const moveStarElement = () => {
            const now = Date.now() / 1000; // Tempo in secondi per un movimento più lento
            const period = parseFloat(star.moveDuration); // Periodo in secondi
            
            // Movimento ondulatorio basato sul tempo
            const xOffset = Math.sin(now / (period / (2 * Math.PI))) * 2 * star.moveX;
            const yOffset = Math.cos(now / (period / (2 * Math.PI) * 1.3)) * 2 * star.moveY;
            
            // Applica la trasformazione
            element.style.transform = `translate(${xOffset}vh, ${yOffset}vh)`;
            
            requestAnimationFrame(moveStarElement);
          };
          
          requestAnimationFrame(moveStarElement);
        }
      });
    };
    
    const movementTimeout = setTimeout(moveStars, 500); // Leggero ritardo per assicurarsi che il DOM sia pronto
    
    return () => {
      clearTimeout(movementTimeout);
    };
  }, [stars]);

  return (
    <div className={`starlight-bg ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star--${star.size}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
      
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            transform: `rotate(${star.angle})`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: 0
          }}
        />
      ))}
      
      {galaxies.map((galaxy) => (
        <div
          key={galaxy.id}
          className="galaxy"
          style={{
            top: galaxy.top,
            left: galaxy.left,
            width: galaxy.size,
            height: galaxy.size,
            animationDelay: galaxy.delay,
            animation: `float ${galaxy.duration} infinite ease-in-out, drift ${parseInt(galaxy.duration) * 1.5}s infinite ease-in-out ${galaxy.delay}`,
            background: `radial-gradient(ellipse at center, 
              hsla(${galaxy.hue}, 100%, 60%, 0.15) 0%, 
              hsla(${galaxy.hue}, 100%, 60%, 0.05) 40%, 
              transparent 70%)`
          }}
        />
      ))}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}