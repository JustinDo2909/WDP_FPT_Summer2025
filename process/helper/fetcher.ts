// utils/fetcher.ts
const BASE_URL = "https://cosme-play-be.vercel.app/api";

export async function fetcher(
  endpoint: string,
  options?: { revalidate?: number },
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`Fetch error (${response.status}): ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
