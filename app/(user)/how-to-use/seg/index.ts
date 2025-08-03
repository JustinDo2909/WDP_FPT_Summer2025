import { fetcher } from "@/process/helper/fetcher";


export async function fetchPosts() {
  try {
    return await fetcher(`/posts`, { revalidate: 60 });
  } catch {
    return { posts: [], total: 0, page: 1, totalPages: 0 };
  }
}

export async function fetchPost(category: string) {
  try {
    return await fetcher(`/posts/${category}`, { revalidate: 60 });
  } catch {
    return { post: {}};
  }
}
