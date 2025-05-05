import { getUrl } from "aws-amplify/storage";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchImageUrl = async (key: string) => {
  if (!key) return undefined;

  try {
    const { url } = await getUrl({ path: key });
    return url.href;
  } catch (error) {
    console.error("Error fetching image URL for key:", key, error);
    return undefined;
  }
};
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

