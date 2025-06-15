import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Smooth scroll function with debugging
export const scrollToElement = (id: string) => {
  console.log(`Tentativo di scroll all'elemento con ID: ${id}`);
  
  const element = document.getElementById(id);
  
  if (element) {
    console.log(`Elemento trovato, scrolling a offsetTop: ${element.offsetTop}`);
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  } else {
    console.log(`Elemento con ID ${id} non trovato nel DOM`);
  }
};
