import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: any) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;
  return new Date(date).toLocaleDateString("fi-FI", options);
}
