import { fetcher } from "@/process/helper/fetcher";

export async function fetchEventData(event_id: string) {
  try {
    return await fetcher(`/events/${event_id}/leaderboard`, { revalidate: 60 });
  } catch {
    return { data: {} };
  }
}
