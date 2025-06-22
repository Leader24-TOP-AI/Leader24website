interface LightningBoltProps {
  className?: string;
}

export function LightningBolt({ className }: LightningBoltProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M100 20L40 120H85L75 180L160 80H100L100 20Z" 
        fill="#3662e3" 
      />
    </svg>
  );
}
