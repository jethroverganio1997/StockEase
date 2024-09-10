import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLowestAndHighest(numbers: string[]) : string {
  let lowest = 0;
  let highest = 0;

  numbers.forEach((range,index) => {
    const parts = range.split("-");
    const start = parseInt(parts[0]);
    const end = parts[1] ? parseInt(parts[1]) : 0;

    if(index === 0){
      lowest = start;
      highest = end;
    }

    if(end === 0){
      highest = end;
    }

    if (start < lowest) {
      lowest = start;
    }

    if (end > highest) {
      highest = end;
    }
  });

  if (highest === 0 && lowest === 0) return '';

  return `${lowest}-${highest}`;
}