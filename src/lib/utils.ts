import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { loginURL } from "./APIConstants";

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

export async function sendLogin(username: string, password: string) {
  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log(response);
    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}