export async function fetchProductById(id: string) {
  const url = `https://cosme-play-be.vercel.app/api/products/${id}`;

  try {
    const response = await fetch(url, {
      // Revalidate the cache every 60 seconds (Next.js 13+ feature)
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with id ${id}: ${response.status}`,
      );
    }

    const data = await response.json();
    return data; // Expecting a single product object
  } catch (error) {
    console.error(`Error fetching product by ID (${id}):`, error);
    return null;
  }
}
