import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats repository names to Title Case, handling multiple naming conventions
 * @param repoName - The repository name to format
 * @returns Formatted title string
 */
export const formatProjectTitle = (repoName: string): string => {
  // Handle kebab-case
  if (repoName.includes("-")) {
    return repoName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return repoName;
};
