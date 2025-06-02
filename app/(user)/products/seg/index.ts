export async function fetchProducts(params: {
  category?: string;
  brand?: string;
  page?: string;
  limit?: string;
  sort?: string;
}) {
  const { category = '', brand = '', page = '1', limit = '10', sort = '' } = params;
  
  const url = `https://cosme-play-be.vercel.app/api/products?category=${category}&brand=${brand}&page=${page}&limit=${limit}&sort=${sort}`;
  
  try {
    const response = await fetch(url, {
      // Enable caching for better performance
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array or handle error as needed
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}